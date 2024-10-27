import React from "react";
import { signup } from "../actions";
import Link from "next/link";

const page = () => {
  return (
    <div className="m-h-screen flex w-full flex-col items-center justify-center bg-slate-50 p-4">
      <form
        className="flex w-full flex-col gap-4 rounded-xl border-2 border-black/50 bg-white p-4 shadow-xl md:w-80"
        action={signup}
      >
        <div className="flex flex-col items-center justify-end">
          <p className="font-serif text-2xl">Sign Up For</p>
          <h1 className="font-sans text-4xl font-semibold text-black/80">
            PROTEK 2024
          </h1>
          <p className="text-sm text-black/50">Powered by μLearn PRC</p>
          <hr className="mt-3 w-3/4 bg-black/10" />
        </div>
        <label htmlFor="name" className="flex flex-col gap-2">
          <span className="w-max rounded-xl bg-rose-200 p-2 px-4 font-serif text-sm">
            Name
          </span>
          <input type="string" name="name" id="name" placeholder="Name" />
        </label>

        <label htmlFor="email" className="flex flex-col gap-2">
          <span className="w-max rounded-xl bg-purple-300 p-2 px-4 font-serif text-sm">
            E Mail
          </span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </label>

        <label htmlFor="phno" className="flex flex-col gap-2">
          <span className="w-max rounded-xl bg-green-300 p-2 px-4 font-serif text-sm">
            Phone Number
          </span>
          <input
            type="string"
            name="phno"
            id="phno"
            placeholder="+91 462658626"
          />
        </label>
        <div className="flex flex-row justify-between gap-4">
          <label htmlFor="phno" className="flex flex-col gap-2">
            <span className="w-max rounded-xl bg-orange-300 p-2 px-4 font-serif text-sm">
              Department
            </span>
            <input type="string" name="dept" id="dept" placeholder="eg:ME" />
          </label>
          <label htmlFor="phno" className="flex flex-col gap-2">
            <span className="w-max rounded-xl bg-blue-300 p-2 px-4 font-serif text-sm">
              Year
            </span>
            <input type="string" name="year" id="year" placeholder="2" />
          </label>
        </div>

        <label htmlFor="password" className="flex flex-col gap-2">
          <span className="w-max rounded-xl bg-purple-300 p-2 px-4 font-serif text-sm">
            Password
          </span>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>

        <label htmlFor="confirm" className="flex flex-col gap-2">
          <span className="w-max rounded-xl bg-yellow-200 p-2 px-4 font-serif text-sm">
            Confirm Password
          </span>
          <input
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Retype Password"
          />
        </label>

        <button
          type="submit"
          className="rounded-[0.5rem] bg-green-500 p-2 font-serif text-white shadow"
        >
          Submit
        </button>
        <p className="text-center text-neutral-600">
          Already have an account ?{" "}
          <Link className="font-bold text-black" href={"/sign-in"}>
            SignIn
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;
