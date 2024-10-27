"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaCaretRight } from "react-icons/fa";

const ViewTeamButton = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const Router = useRouter();
  const supabase = createClient();

  const checkTeamInfo = async () => {
    setLoad(true);

    const { data: team, error } = await supabase
      .from("team_members")
      .select("team_code")
      .eq("member_id", userId)
      .single();
    console.log(team);

    if (error) {
      console.log(error.message);
      setLoad(false);
    }
    const teamCode = team?.team_code;
    if (!teamCode) {
      setLoad(false);
      setOpen(true);
    } else {
      Router.push(`/team/${teamCode}`);
    }
    return teamCode;
  };

  return (
    <>
      <button
        onClick={checkTeamInfo}
        disabled={load}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-center font-semibold text-black"
      >
        View Team
        {load && (
          <AiOutlineLoading3Quarters size={20} className="animate-spin" />
        )}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-0 bg-slate-100">
          <DialogHeader>
            <DialogTitle>❌ You are not in any team !</DialogTitle>
            <p className="mb-6">
              You need to create or join a team to view the team info
            </p>
            <Link
              className="flex items-center justify-center rounded-xl bg-green-600 p-2 text-white"
              href={`/statements`}
            >
              Go to Problem List
              <FaCaretRight size={20} />
            </Link>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewTeamButton;
