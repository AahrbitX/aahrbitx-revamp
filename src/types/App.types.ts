import { Database } from "./database.types"

export type AppUser = Database["public"]["Views"]["app_users_view"]["Row"]

export type SupabaseAuthProvider =
  | "email"
  | "google"
  | "github"
  | "gitlab"
  | "bitbucket"
  | "discord"
  | "azure"
  | "facebook"
  | "spotify"
  | "twitch"
  | "twitter"
  | "slack"
  | "linkedin"