import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { generateProof, verify } from "../service";
import { Proof, SetupKeypair } from "zokrates-js";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { id, email, message } = await request.json();

  try {
    // generate a proof for the data sent with the request body
    const generatedProofForInputs:
      | {
          proof: Proof;
          keypair: SetupKeypair;
        }
      | undefined = await generateProof(message);

    // get proof from the database
    const { data, error }: any = await supabase
      .from("proofs")
      .select()
      .eq("id", id);

    // check if the generated proof inputs return true for the proof selected from the database
    const isCorrect: boolean | undefined = await verify(
      data[0].verification_key,
      data[0].proof,
      generatedProofForInputs!.proof.inputs,
    );

    if (isCorrect) {
      // trigger emails sends if true
    }

    return NextResponse.json({ isCorrect, error });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
