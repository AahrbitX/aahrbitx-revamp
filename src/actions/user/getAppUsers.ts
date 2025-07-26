"use server";

import { AppUser } from "@/types/App.types";
import { createDBClient } from "@/utils/supabase/DBclient";

async function getAppUsers(): Promise<AppUser[]> {
  const supabase = createDBClient();

  const { data, error } = await supabase.from("app_users_view").select("*");

  if (error) {
    return [];
  }

  return data as AppUser[];
}

export default getAppUsers;
