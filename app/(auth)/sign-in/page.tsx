import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const supabase = createServerActionClient({
        cookies,
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      redirect('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <form
        className="flex w-fit flex-col gap-4 rounded-xl border p-4"
        action={signUp}
      >
        <h2 className="text-2xl font-bold">SignIn</h2>
        <hr className="w-full" />

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
          />
        </label>

        <button
          type="submit"
          className="rounded-[0.5rem] bg-blue-500 p-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
