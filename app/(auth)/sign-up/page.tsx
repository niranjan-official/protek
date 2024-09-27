import React from "react";
import { signup } from "../actions";

const page = () => {

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <form
        className="flex w-fit flex-col gap-4 rounded-xl border p-4"
        action={signup}
      >
        <h2 className="text-2xl font-bold">SignUp</h2>
        <hr className="w-full" />
        <label htmlFor="name">
          Name
          <input type="string" name="name" id="name" />
        </label>

        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>

        <label htmlFor="phno">
          Phone Number
          <input type="string" name="phno" id="phno" />
        </label>

        <label htmlFor="dept">
          Department
          <input type="string" name="dept" id="dept" />
        </label>

        <label htmlFor="year">
          Year
          <input type="string" name="year" id="year" />
        </label>

        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" />
        </label>

        <label htmlFor="confirm">
          Confirm Password
          <input type="password" name="confirm" id="confirm" />
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
