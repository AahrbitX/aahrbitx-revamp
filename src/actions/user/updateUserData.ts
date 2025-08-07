"use server";

import { AppUser } from "@/types/App.types";
import { Database } from "@/types/database.types";
import { createDBClient } from "@/utils/supabase/DBclient";

type UpdateUserDataResponse =
  Database["public"]["Tables"]["user_management"]["Row"];

export const updateUserData = async (data: {
  id: string;
  username: string;
  primary_phone: string;
  secondary_phone: string;
}): Promise<UpdateUserDataResponse> => {
  const supabase = createDBClient();

  const { data: ResData, error: ResError } = await supabase
    .from("user_management")
    .update({
      username: data.username,
      phone: data.primary_phone,
      secondary_phone: data.secondary_phone,
    })
    .eq("id", data.id!)
    .select("*")
    .single();

  if (ResError) {
    throw new Error(ResError.message);
  }

  return ResData;
};
