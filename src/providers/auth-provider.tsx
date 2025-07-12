"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { AppUser } from "@/types/App.types"

type AuthContextType = {
  isAuth: boolean
  user: AppUser | null
  authSession: Session | null
  logout: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>
  setAuthSession: React.Dispatch<React.SetStateAction<Session | null>>
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  authSession: null,
  setUser: () => {},
  setAuthSession: () => {},
  logout: () => Promise.resolve(),
})

export const SupabaseAuthProvider = ({ children, session, appUser }: { children: React.ReactNode, session: Session | null, appUser: AppUser | null }) => {

  const [authSession, setAuthSession] = useState<Session | null>(session)

  const [user, setUser] = useState<AppUser | null>(appUser)

  const supabase = createClient()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
      throw error
    }
    setAuthSession(null)
    setUser(null)
    redirect("/")
  }

  return (
    <AuthContext.Provider value={{ isAuth: !!user, user, authSession, logout, setUser, setAuthSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
