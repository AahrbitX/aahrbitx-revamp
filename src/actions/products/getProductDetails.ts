import { createDBClient } from "@/utils/supabase/DBclient";

export const getProductDetails = async (productId: string) => {
  const supabase = createDBClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.log("Failed to fetch products:", error);
  }

  return data;
};
