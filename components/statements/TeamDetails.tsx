import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

interface TeamProps {
  teamCode: number;
  name: string;
  userId: string;
  statementId: string;
}
const TeamDetails = ({ teamCode, name, userId, statementId }: TeamProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const Router = useRouter();

  const joinTeam = async () => {
    setLoading(true);
    try {
      const data = {
        teamCode,
        userId,
        statementId,
      };

      const response = await fetch("/api/join-team", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        Router.push(`/team/${teamCode}`);
      } else {
        setError(true);
        switch (result.errorType) {
          case "ALREADY_IN_TEAM":
            setErrorMessage("You are already a lead or member of another team");
            break;
          case "TEAM_FULL":
            setErrorMessage("Sorry, the team is already full");
            break;
          case "DEPARTMENT_REQUIREMENT_NOT_MET":
            setErrorMessage(
              "Sorry, you doesn't have the department eligibility to join this team",
            );
            break;

          default:
            setErrorMessage("Unknown error occured, contact your officials");
            break;
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-violet-300 p-2 px-4">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold">{teamCode}</h3>
        <p>{name}</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-xl bg-violet-800 p-2 px-5 text-white">
            Join
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-xl bg-slate-200">
          <DialogHeader className="w-full">
            <DialogTitle>
              Joining a team can't be undone. <br /> Are you sure you want to
              join this team ?
            </DialogTitle>
            <div className="mt-4 flex w-full flex-col">
              <button
                onClick={joinTeam}
                className="mt-4 w-full rounded-full bg-yellow-500 p-2 font-bold disabled:bg-yellow-700"
                disabled={loading || error}
              >
                {loading
                  ? "checking eligibility"
                  : error
                    ? "Denied"
                    : "Join Team"}
              </button>
              {error && (
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-semibold">❌ Not Eligible</span>
                  <p className="px-6 text-sm">{errorMessage}</p>
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamDetails;
