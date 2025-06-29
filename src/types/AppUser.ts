import { User } from "@supabase/supabase-js";

export type UserRole = "superuser" | "admin" | "user";

export type AppUser = User & {
    role: UserRole;
}