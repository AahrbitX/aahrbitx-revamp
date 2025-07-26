"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { cn } from "@/lib/utils";

function UserAvatar({ compact = false }: { compact?: boolean }) {
  const { user } = useAuthOrg();

  const userName: string = user?.email || "User";
  const userAvatar = user?.app_role === "superuser" ? "/logo_pfp.png" : null;

  const fallbackText = userName.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        compact
          ? "inline-block"
          : "flex items-center justify-evenly w-full max-w-20"
      )}
    >
      <Avatar>
        {userAvatar && <AvatarImage src={userAvatar} alt="@shadcn" />}
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      {!compact && (
        <div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {userName}
          </span>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
