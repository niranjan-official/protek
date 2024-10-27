import IdeaForm from "@/components/own-idea/IdeaForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ userId }: { userId: string }) => {
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <IdeaForm userId={userData?.user?.id} />
    </div>
  );
};

export default page;
