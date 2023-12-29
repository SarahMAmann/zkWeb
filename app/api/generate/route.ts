import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // eventually the request body will be used
  const { data, error } = await supabase
    .from("proofs")
    .insert([
      {
        title: "newProofTitle",
        email: "email2@example.com",
        proof: "another test",
      },
    ])
    .select();

  return NextResponse.json({ data, error });
}
