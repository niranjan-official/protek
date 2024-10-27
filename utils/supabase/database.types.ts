import { UUID } from "crypto";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: UUID;
          name: string;
          email: string;
          phno: number;
          dept: string;
          year: number;
          dateOfReg: Date;
        };
        statements: {
          Row: {
            id: UUID;
            title: string;
            description: string;
            team_code: number;
            selectedCount: number;
            timeStamp: Date;
          };
        };
        statement_departments: {
          Row: {
            statement_id: UUID;
            department_id: UUID;
          };
        };
        departments: {
          Row: {
            id: UUID;
            name: string;
          };
        };
        teams: {
          Row: {
            id: UUID;
            statement_id: UUID;
            lead_id: UUID;
            name: string;
            description: string;
            timeStamp: Date;
          };
        };
      };
    };
  };
}
