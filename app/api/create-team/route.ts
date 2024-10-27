import { generateTeamCode } from "@/helpers";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const supabase = createClient();

  let code = generateTeamCode();
  let codeExists = true;

  while (codeExists) {
    const { data: existingTeam, error: checkError } = await supabase
      .from("teams")
      .select("id")
      .eq("team_code", code)
      .single();

    if (!existingTeam) {
      codeExists = false;
    } else {
      code = generateTeamCode();
    }
  }

  try {
    // Use Promise.all to perform the two inserts in parallel
    const [{ error: teamInsertError }, { error: memberInsertError }] = await Promise.all([
      supabase.from("teams").insert({
        statement_id: data.statement_id,
        lead_id: data.lead_id,
        name: data.name,
        description: data.description,
        team_code: code,
      }),
      supabase.from("team_members").insert({
        member_id: data.lead_id,
        team_code: code,
      })
    ]);

    if (teamInsertError || memberInsertError) {
      return NextResponse.json({
        success: false,
        message: teamInsertError?.message || memberInsertError?.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Team created successfully",
      code: code,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred during the transaction",
    });
  }
}
