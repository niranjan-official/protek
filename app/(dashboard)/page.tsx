import ViewTeamButton from "@/components/home/ViewTeamButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  
  const supabase = createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-rose-100 p-4">
      <div className="flex w-full flex-col rounded-xl bg-pink-600 p-4 text-center text-white shadow-md">
        <h2 className="text-3xl font-extrabold">PROTEK 24</h2>
        <p className="mt-1">
          Welcome to the official website for PROTEK 2024 organized bt MuLearn
          PRC
        </p>

        <p className="mt-4 text-start">
          To continue, select any of the following options :
        </p>
        <Link
          href={"/statements"}
          className="mt-4 w-full rounded-lg bg-white p-3 text-center font-semibold text-black"
        >
          View Problem Statements
        </Link>
        <Link
          href={"/own-idea"}
          className="mt-4 w-full rounded-lg bg-white p-3 text-center font-semibold text-black"
        >
          Select Own Idea
        </Link>
        <ViewTeamButton userId={userData?.user?.id} />
      </div>
    </div>
  );
};

export default page;
