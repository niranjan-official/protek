import StatementCard from "@/components/statements/StatementCard";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const getStatements = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("statements").select();
  if (error) {
    console.log(error);
    return null;
  }
  console.log(data);
  return data;
};

const page = async () => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const statements = await getStatements();
  return (
    <div className="flex h-screen w-full flex-col bg-slate-100 p-4">
      <h3 className="text-3xl">Problem statements</h3>
      <div className="flex flex-col gap-4 mt-5">
        {statements?.map((statement) => (
          <StatementCard
            key={statement.id}
            statementId={statement.id}
            userId={userData?.user?.id!}
            title={statement.title}
            description={statement.description}
          />
        ))}
      </div>
    </div>
  );
};

export default page;