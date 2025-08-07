"use server";

import { revalidatePath } from "next/cache";
import getCurrUser from "../user/getCurrUser";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Signup data:", data);

  const { data: signupData, error } = await supabase.auth.signUp(data);

  if (error) {
    return { data: null, error: error.message };
  }

  const appUser = await getCurrUser(signupData.user!.id);

  revalidatePath("/", "layout");

  return { data: signupData, error: null, appUser };
}
