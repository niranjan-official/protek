"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  description: string;
  userId: string;
}

const StatementCard = ({ id, title, description, userId }: Props) => {
  const Router = useRouter();

  const createTeam = async (formData: FormData) => {
    try {
      const teamData = {
        statement_id: id,
        lead_id: userId,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      };

      const response = await fetch("/api/create-team", {
        method: "POST",
        body: JSON.stringify(teamData),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        Router.push(`/team/${result.code}`);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl bg-green-500 p-3 text-white">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-2 rounded-xl bg-green-800 p-2 px-4">
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
                      action={createTeam}
                    >
                      <label htmlFor="email">
                        Name
                        <input
                          className="border-b border-black"
                          type="text"
                          name="name"
                        />
                      </label>

                      <label htmlFor="password">
                        Description
                        <input
                          className="border-b border-black"
                          type="text"
                          name="description"
                        />
                      </label>

                      <button
                        type="submit"
                        className="mt-4 w-full rounded-[0.5rem] bg-blue-500 p-2 text-white"
                      >
                        Create Team
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
                  <button className="w-full rounded-xl bg-green-500 p-2 font-semibold">
                    Join a team
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-slate-200">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
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
