import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { generateProof } from "../service";
import { Proof, SetupKeypair } from "zokrates-js";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { title, email, message } = await request.json();

  try {
    const generatedProof:
      | {
          proof: Proof;
          keypair: SetupKeypair;
        }
      | undefined = await generateProof(message);

    const { data, error } = await supabase
      .from("proofs")
      .insert([
        {
          title: title,
          email: email,
          proof: generatedProof?.proof,
          verification_key: generatedProof?.keypair.vk,
        },
      ])
      .select();

    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
