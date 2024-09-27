import React from "react";
import { login } from "../actions";

const page = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <form
        className="flex w-fit flex-col gap-4 rounded-xl border p-4"
        action={login}
      >
        <h2 className="text-2xl font-bold">SignIn</h2>
        <hr className="w-full" />

        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" />
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
