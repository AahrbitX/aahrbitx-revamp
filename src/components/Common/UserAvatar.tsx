"use client"
import React from 'react'

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { useAuth } from '@/providers/auth-provider'
import { cn } from '@/lib/utils'

function UserAvatar({
    compact = false,
}:{
    compact?: boolean
}) {

    const {user} = useAuth();

    const userName : string = user?.email || "User";

    const fallbackText = userName.slice(0, 2).toUpperCase();


  return (
     <div className={cn(compact? "inline-block" : "flex items-center justify-evenly w-full max-w-20")}>
      <Avatar>
        {/* <AvatarImage src="" alt="@shadcn" /> */}
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      { !compact && (
        <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {userName}
            </span>
        </div>
      )}
    </div>
  )
}

export default UserAvatar