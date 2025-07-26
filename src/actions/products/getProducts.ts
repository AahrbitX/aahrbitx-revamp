import { createDBClient } from "@/utils/supabase/DBclient";

export const getProducts = async () => {
  const supabase = createDBClient();

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.log("Failed to fetch products:", error);
  }

  return data;
};
