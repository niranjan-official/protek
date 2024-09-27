import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const supabase = createClient();

  const { error } = await supabase.from("teams").insert({
    statement_id: data.statement_id,
    lead_id: data.lead_id,
    name: data.name,
    description: data.description,
  });
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
  return NextResponse.json({
    success: true,
    message: "Team Created successfully",
  });
}
