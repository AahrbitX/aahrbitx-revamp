import { createClient } from "@supabase/supabase-js";

export const createServiceClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // This is the key with elevated privileges
  );
