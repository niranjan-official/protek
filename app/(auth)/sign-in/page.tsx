import React from "react";
import { login } from "../actions";

const page = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-100 px-4">
    <form
      className="flex w-full flex-col gap-4 rounded-xl border-2 border-black/50 bg-white p-4 shadow-xl md:w-80"
      action={login}
    >
      <div className="flex flex-col items-center justify-end">
        <p className="text-2xl font-serif">Login In To</p>
        <h1 className="font-sans text-4xl font-semibold text-black/80">
          PROTEK 2024
        </h1>
        <p className="text-sm text-black/50">Powered by μLearn PRC</p>
        <hr className="mt-3 w-3/4 bg-black/10" />
      </div>

      <label htmlFor="email">
        <h1 className="w-max rounded-xl bg-rose-200 p-2 font-serif text-sm">
          E Mail
        </h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          className="border-2 border-black/30"
        />
      </label>

      <label htmlFor="password">
        <h1 className="w-max rounded-xl bg-purple-300 p-2 font-serif text-sm">
          Password
        </h1>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="border-2 border-black/30"
        />
      </label>

      <button
        type="submit"
        className="rounded-[0.5rem] bg-green-500 p-2 font-serif"
      >
        Submit
      </button>
    </form>
  </div>
  );
};

export default page;
