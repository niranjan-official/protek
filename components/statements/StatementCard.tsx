"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TeamDetails from "./TeamDetails";
import { TeamDataType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  statementId: string;
  title: string;
  description: string;
  userId: string;
}

const StatementCard = ({ statementId, title, description, userId }: Props) => {
  const [teams, setTeams] = useState<TeamDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const getTeams = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/get-teams?id=${statementId}`);
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setTeams(result.data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter teams based on teamCode input
  const filteredTeams = teams.filter((team) =>
    String(team.team_code).includes(teamCode)
  );

  const createTeam = async (formData: FormData) => {
    try {
      const teamData = {
        statement_id: statementId,
        lead_id: userId,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      };

      const response = await fetch("/api/create-team", {
        method: "POST",
        body: JSON.stringify(teamData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl bg-rose-600 p-3 text-white shadow-md">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-2 rounded-xl bg-cyan-100 p-2 px-4 font-bold text-black shadow">
            Select
          </button>
        </DialogTrigger>
        <DialogContent className="bg-slate-200">
          <DialogHeader>
            <div className="flex flex-col gap-4 text-white">
              <h2 className="text-2xl font-semibold capitalize text-black">
                {title}
              </h2>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full rounded-xl bg-orange-500 p-2 font-semibold">
                    Create a team
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-xl bg-slate-200">
                  <DialogHeader className="w-full">
                    <DialogTitle>Provide Team Details</DialogTitle>
                    <form
                      className="flex w-full flex-col items-start gap-4 rounded-xl border p-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as HTMLFormElement;
                        createTeam(new FormData(target));
                      }}
                    >
                      <label htmlFor="name">
                        Name
                        <input
                          className="border-b border-black"
                          type="text"
                          name="name"
                          required
                        />
                      </label>

                      <label htmlFor="description">
                        Description
                        <input
                          className="border-b border-black"
                          type="text"
                          name="description"
                          required
                        />
                      </label>

                      <button
                        type="submit"
                        className="mt-4 w-full rounded-[0.5rem] bg-blue-500 p-2 text-white"
                      >
                        Submit
                      </button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2">
                <hr className="w-full border border-black" />
                <span className="text-black">OR</span>
                <hr className="w-full border border-black" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={getTeams}
                    className="w-full rounded-xl bg-green-500 p-2 font-semibold"
                  >
                    Join a team
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-slate-200">
                  <DialogHeader>
                    <DialogTitle>Find a team</DialogTitle>
                    <div className="flex w-full flex-col">
                      <input
                        type="text"
                        className="mt-3 w-full rounded-full border border-black pl-4 focus:outline-none focus:ring-0"
                        placeholder="Enter Team Code"
                        value={teamCode}
                        onChange={(e) => setTeamCode(e.target.value)} // Update teamCode on input change
                      />
                      <p className="mt-4 text-start font-semibold">
                        List of Teams
                      </p>
                      <hr className="mt-2 border border-black/30" />
                      {loading && !teams[0] && (
                        <div className="mt-4 flex w-full flex-col gap-4">
                          <Skeleton className="h-[20px] w-full rounded-full" />
                          <Skeleton className="h-[20px] w-full rounded-full" />
                          <Skeleton className="h-[20px] w-full rounded-full" />
                        </div>
                      )}
                      {error && <span className="text-red-500">{error}</span>}
                      {!loading && !filteredTeams.length && (
                        <span className="mt-4">No teams found</span>
                      )}
                      {filteredTeams.length > 0 && (
                        <div className="flex flex-col text-start">
                          <div className="mt-3 flex w-full flex-col gap-4">
                            {filteredTeams.map((team, index) => (
                              <TeamDetails
                                key={index}
                                teamCode={team.team_code}
                                name={team.name}
                                userId={userId}
                                statementId={statementId}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatementCard;