"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    const { error, data: credentials } = await supabase.auth.signUp(data);

    if (error) {
      throw new Error(error.message);
    }
    const storageData = {
      id:  credentials.user?.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phno: formData.get("phno") as string,
      dept: formData.get("dept") as string,
      year: formData.get("year") as string,
    };
    console.log(credentials);

    const { error: insertionError } = await supabase
      .from("users")
      .insert(storageData);

    if (insertionError) {
      throw new Error(insertionError.message);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
