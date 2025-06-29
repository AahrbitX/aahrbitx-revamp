"use server"
import { UserRole } from "@/types/AppUser"
import { createClient } from "@/utils/supabase/server"

export const getUserRole = async (userId: string): Promise<UserRole | null> => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_management")
    .select("role")
    .eq("id", userId) 
    .single()

  if (error) {
    console.error("Error fetching user role:", error.message)
    return null
  }

  return data?.role ?? null
}
