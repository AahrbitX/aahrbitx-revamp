import { createDBClient } from "@/utils/supabase/DBclient";

export const getApplicationData = async (appId: string) => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("org_applications")
    .select("*")
    .eq("id", appId);

  if (error) {
    console.log("Failed to fetch applications:", error);
  }

  return data;
};
