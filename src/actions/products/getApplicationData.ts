import { createDBClient } from "@/utils/supabase/DBclient";
import { getProductDetails } from "./getProductDetails";

export const getApplicationData = async (appId: string) => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("org_applications")
    .select("*")
    .eq("id", appId)
    .single();

  if (error) {
    console.log("Failed to fetch applications:", error);
  }

  const subscribed_product_id = data?.subscribed_product;

  if (!subscribed_product_id) {
    console.log("No subscribed product found.");
    return null;
  }

  const subscribed_product = await getProductDetails(subscribed_product_id);

  return { ...data, subscribed_product };
};
