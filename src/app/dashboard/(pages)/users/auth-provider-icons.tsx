"use client"

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandGitlab,
  IconBrandBitbucket,
  IconBrandDiscord,
  IconBrandAzure,
  IconBrandFacebook,
  IconBrandSpotify,
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandSlack,
  IconBrandLinkedin,
  IconMail,
  IconUserQuestion,
} from "@tabler/icons-react"

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

type Props = {
  provider: SupabaseAuthProvider | string;
  size?: number
  className?: string
}

export function AuthProviderIcon({ provider, size = 20, className = "" }: Props) {
  switch (provider) {
    case "google":
      return <IconBrandGoogle size={size} className={className} />
    case "github":
      return <IconBrandGithub size={size} className={className} />
    case "gitlab":
      return <IconBrandGitlab size={size} className={className} />
    case "bitbucket":
      return <IconBrandBitbucket size={size} className={className} />
    case "discord":
      return <IconBrandDiscord size={size} className={className} />
    case "azure":
      return <IconBrandAzure size={size} className={className} />
    case "facebook":
      return <IconBrandFacebook size={size} className={className} />
    case "spotify":
      return <IconBrandSpotify size={size} className={className} />
    case "twitch":
      return <IconBrandTwitch size={size} className={className} />
    case "twitter":
      return <IconBrandTwitter size={size} className={className} />
    case "slack":
      return <IconBrandSlack size={size} className={className} />
    case "linkedin":
      return <IconBrandLinkedin size={size} className={className} />
    case "email":
      return <IconMail size={size} className={className} />
    default:
      return <IconUserQuestion size={size} className={className} />
  }
}
