"use client";
import React, { useState } from "react";

interface TeamDataProps {
  name: string;
  description: string;
  team_code: number;
}
const TeamDataCard = ({ name, description, team_code } :TeamDataProps) => {
  const [lead, setLead] = useState('');
  // const [lead, setLead] = useState('');
  return (
    <div className="flex flex-col gap-2 bg-white p-3">
      <p>Team Name: {name}</p>
      <p>Description: {description}</p>
      <p>Code: {team_code}</p>
    </div>
  );
};

export default TeamDataCard;
