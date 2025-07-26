"use server";

import { AppUser } from "@/types/App.types";
import { createDBClient } from "@/utils/supabase/DBclient";

async function getCurrUser(id: string): Promise<AppUser | null> {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("app_users_view")
    .select("*")
    .eq("id", id);

  if (error) {
    return null;
  }

  return data[0] as AppUser;
}

export default getCurrUser;
