"use client"

import { Crown, Shield, User } from "lucide-react"

type UserRole = "superuser" | "admin" | "user"

type Props = {
  role: UserRole | string
  className?: string
}

export function RoleBadge({ role, className = "" }: Props) {
  switch (role) {
    case "superuser":
      return (
        <span className={className}>
          <Crown className="inline" size={14} color="gold" fill="gold" /> {role}
        </span>
      )
    case "admin":
      return (
        <span className={className}>
          <Shield className="inline" size={14} fill="crimson" color="crimson" /> {role}
        </span>
      )
    case "user":
      return (
        <span className={className}>
          <User className="inline" size={14} fill="green" color="green" /> {role}
        </span>
      )
    default:
      return (
        <span className={className}>
          <User className="inline" size={14} fill="gray" color="gray" /> {role}
        </span>
      )
  }
}
