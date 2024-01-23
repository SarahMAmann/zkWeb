import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { generateProof } from "../zokrates-service";
import { Proof, SetupKeypair } from "zokrates-js";
import { get14DigitHashFromString } from "../crypto";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { title, email, dataType, inputData } = await request.json();

  try {
    const formatted =
      dataType === "dateData" ? inputData : get14DigitHashFromString(inputData);

    const generatedProof:
      | {
          proof: Proof;
          keypair: SetupKeypair;
        }
      | undefined = await generateProof(formatted);

    if (generatedProof) {
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
    } else {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
