import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: proof, error } = await supabase
    .from("proofs")
    .select()
    .eq("id", "4ac9a726-1e7b-4565-8eaf-31aa925b04d1");

  // generate a proof for the data sent with the request body and check if it matches the proof selected from the database
  // trigger emails sends when true

  return NextResponse.json({ message: true }, { status: 200 });
}
