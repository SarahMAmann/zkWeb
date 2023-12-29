import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// this will eventually need to be a post so we can get by id and use the request body
export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: proof, error } = await supabase
    .from("proofs")
    .select()
    .eq("id", "4ac9a726-1e7b-4565-8eaf-31aa925b04d1");

  return NextResponse.json({ proof, error });
}
