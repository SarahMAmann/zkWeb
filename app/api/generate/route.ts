import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { generateProof } from "../service/service";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { title, email, message } = await request.json();

  try {
    const generatedProof = await generateProof(message);

    const { data, error } = await supabase
      .from("proofs")
      .insert([{ title: title, email: email, proof: generatedProof }])
      .select();

    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
