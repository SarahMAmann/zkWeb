import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { searchText } = await request.json();

  try {
    const { data, error } = await supabase
      .from("proofs")
      .select()
      .textSearch("title", searchText, {
        type: "websearch",
        config: "english",
      });

    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
