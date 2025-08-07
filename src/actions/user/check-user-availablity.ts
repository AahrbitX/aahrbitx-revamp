"use server";

import { createClient } from "@/utils/supabase/server";

export const checkUserAvailablity = async (email: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("check_user_exists_by_email", {
    input_email: email,
  });

  if (error) {
    console.error("Error checking user availability:", error);
    return false;
  }

  return data;
};
