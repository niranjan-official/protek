import { UUID } from "crypto";

export interface MemberStatus {
  members: [];
  isMember: boolean;
  error: null | string;
}

export interface Member {
  id: UUID;
  name: string;
  dept: string;
  year: number;
  dateOdReg: Date;
  email: string;
  phno: number;
}

export interface TeamDataType {
  team_code: number;
  statement_id: UUID;
  lead_id: UUID;
  name: string;
  description: string;
  created_at: Date;
}
