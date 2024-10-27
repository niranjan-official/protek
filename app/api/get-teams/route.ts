import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const statementId = req.nextUrl.searchParams.get("id");
  
  const supabase = createClient();

  const {data, error } = await supabase
  .from('teams')
  .select()
  .eq('statement_id', statementId);  

  if(error){
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }

  console.log(data);

  return NextResponse.json({
    success: true,
    message: "Team Created successfully",
    data: data
  });
}
