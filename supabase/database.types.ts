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
      Users: {
        Row: {
          // the data expected from .select()
          id: number;
          name: string;
          email: string;
          phno: number;
          dept: string;
          year: number;
          dateOfReg: Date;
        };
        Insert: {
          name: string;
          email: string;
          phno: number;
          dept: string;
          year: number;
        };
        Update: {
          name: string;
          email: string;
          phno: number;
          dept: string;
          year: number;
        };
      };
    };
  };
}
