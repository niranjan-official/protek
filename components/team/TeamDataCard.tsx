"use client";
import React, { useState } from "react";

interface TeamDataProps {
  name: string;
  description: string;
  team_code: number;
}
const TeamDataCard = ({ name, description, team_code }: TeamDataProps) => {
  const [lead, setLead] = useState("");
  return (
    <div className="flex flex-col gap-16 bg-pink-700 p-3 text-white rounded-b-3xl pb-8">
      <h2 className="text-2xl font-extrabold">PROTEK 24</h2>
      <div>
        <p className="text-xl">{name}</p>
        <p className="text-3xl font-extralight">{team_code}</p>
        <p className="w-3/4 text-sm italic">" {description} "</p>
      </div>
    </div>
  );
};

export default TeamDataCard;
