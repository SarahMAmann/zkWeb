import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: proofs, error } = await supabase
    .from("proofs")
    .select("*")
    .range(0, 9);

  return NextResponse.json({ proofs, error });
}
