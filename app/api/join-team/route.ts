import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const supabase = createClient();
  const { teamCode, userId, statementId } = data;

  try {
    // 1. Check if the user is already in any team
    const { data: userInAnyTeam, error: userCheckError } = await supabase
      .from("team_members")
      .select("*")
      .eq("member_id", userId)
      .single();

    if (userCheckError && userCheckError.code !== "PGRST116") {
      throw new Error(userCheckError.message);
    }

    if (userInAnyTeam) {
      return NextResponse.json({
        success: false,
        errorType: "ALREADY_IN_TEAM",
        message: "User is already part of a team.",
      });
    }

    // 2. Fetch team members count and their departments, including the new user's department
    const { data: teamMembers, error: teamMembersError } = await supabase
      .from("team_members")
      .select("member_id")
      .eq("team_code", teamCode);

    if (teamMembersError) throw new Error(teamMembersError.message);

    if (teamMembers.length >= 5) {
      return NextResponse.json({
        success: false,
        errorType: "TEAM_FULL",
        message: "Team is already full.",
      });
    }

    // Get departments of all current team members and the new user in a single query
    const memberIds = [...teamMembers.map((member) => member.member_id), userId];
    const { data: teamMemberDepts, error: teamMemberDeptsError } = await supabase
      .from("users")
      .select("dept")
      .in("id", memberIds);

    if (teamMemberDeptsError) throw new Error(teamMemberDeptsError.message);

    const teamDepartments = new Set(teamMemberDepts.map((member) => member.dept));
    console.log(teamDepartments);
    

    // 3. Fetch statement requirements
    const { data: statementData, error: statementError } = await supabase
      .from("statements")
      .select("dept_required")
      .eq("id", statementId)
      .single();

    if (statementError) throw new Error(statementError.message);

    const statementDeptRequired = statementData.dept_required || [];
    console.log(statementDeptRequired);
    

    // Check if team satisfies department requirements
    const missingDepartments = statementDeptRequired.filter(
      (dept:string) => !teamDepartments.has(dept)
    );
    if (missingDepartments.length > 0) {
      return NextResponse.json({
        success: false,
        errorType: "DEPARTMENT_REQUIREMENT_NOT_MET",
        message: `Team must include members from the following departments: ${statementDeptRequired.join(", ")}`,
      });
    }

    // If all conditions are met, add the user to the team
    const { error: insertError } = await supabase
      .from("team_members")
      .insert({ team_code: teamCode, member_id: userId });

    if (insertError) throw new Error(insertError.message);

    return NextResponse.json({
      success: true,
      message: "User successfully joined the team.",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      errorType: "SERVER_ERROR",
      message: error.message,
    });
  }
}
