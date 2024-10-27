import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const supabase = createClient();

  // Check if the user is already part of a team
  const { data: existingMember, error: memberCheckError } = await supabase
    .from("team_members")
    .select("team_code")
    .eq("member_id", data.userId)
    .single();

  if (memberCheckError && memberCheckError.code !== "PGRST116") {
    return NextResponse.json({
      success: false,
      errorType: "SERVER_ERROR",
      message: memberCheckError.message,
    });
  }

  // If user is already in a team, stop further processing
  if (existingMember) {
    return NextResponse.json({
      success: false,
      errorType: "ALREADY_IN_TEAM",
      message: "You are already part of a team.",
    });
  }

  // Proceed to submit the idea if user is not part of any team
  const { title, summary, abstract } = data;

  const { error: ideaInsertError } = await supabase
    .from("idea_requests")
    .insert({
      user_id: data.userId,
      title,
      summary,
      abstract,
    });

  if (ideaInsertError) {
    return NextResponse.json({
      success: false,
      errorType: "INSERT_ERROR",
      message: ideaInsertError.message,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Idea submitted successfully",
  });
}
