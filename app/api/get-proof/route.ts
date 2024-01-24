import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { id } = await request.json();

  let { data: proof, error } = await supabase
    .from("proofs")
    .select()
    .eq("id", id);

  return NextResponse.json({ proof, error });
}
