import TeamDataCard from "@/components/team/TeamDataCard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const checkMemberStatus = async (team_code: number, userId: string) => {
  const supabase = createClient();
  const { data: members, error } = await supabase
    .from("team_members")
    .select("member_id")
    .eq("team_code", team_code);

  if (error) {
    console.error(error);
    return { members: [], isMember: false, error: error.message };
  }

  const isMember = members?.some((member) => member.member_id === userId);
  return { members, isMember, error: null };
};

const getTeamDetails = async (team_code: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("name, description, lead_id, team_code")
    .eq("team_code", team_code)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const page = async ({ params }: { params: { id: string } }) => {
  const team_code = parseInt(params.id);
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    return redirect("/sign-in");
  }

  const { isMember } = await checkMemberStatus(team_code, userData.user.id);
  if (!isMember) {
    console.error("Permission denied");
    return redirect("/denied");
  }

  const teamDetails = await getTeamDetails(team_code);
  if (!teamDetails) {
    console.error("Team not found");
    return redirect("/not-found");
  }

  const isLead = teamDetails.lead_id === userData.user.id;

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-300 p-4">
      <TeamDataCard
        name={teamDetails.name}
        description={teamDetails.description}
        team_code={teamDetails.team_code}
      />
    </div>
  );
};

export default page;
