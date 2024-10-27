import { generateTeamCode } from "@/helpers";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const supabase = createClient();

  // Check if the user is already in any team
  const { data: existingMember, error: memberCheckError } = await supabase
    .from("team_members")
    .select("team_code")
    .eq("member_id", data.lead_id)
    .single();

  if (memberCheckError && memberCheckError.code !== "PGRST116") {
    return NextResponse.json({
      success: false,
      message: memberCheckError.message,
    });
  }

  if (existingMember) {
    return NextResponse.json({
      success: false,
      errorType: "ALREADY_IN_TEAM",
      message: "User is already part of a team.",
    });
  }

  // Generate a unique team code
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
