"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { AppUser } from "@/types/AppUser"
import { getUserRole } from "@/actions/auth/getUserRole"

type AuthContextType = {
  isAuth: boolean
  user: AppUser | null
  session: Session | null
  logout: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  session: null,
  setUser: () => {},
  setSession: () => {},
  logout: () => Promise.resolve(),
})

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<AppUser | null>(null)

  const supabase = createClient()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
      throw error
    }
    setSession(null)
    setUser(null)
    redirect("/")
  }

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      const currentSession = data.session
      setSession(currentSession)

      const supabaseUser = currentSession?.user
      if (supabaseUser) {
        const role = await getUserRole(supabaseUser.id)
        setUser({ ...supabaseUser, role } as AppUser)
      }
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      const supabaseUser = newSession?.user
      if (supabaseUser) {
        const role = await getUserRole(supabaseUser.id)
        setUser({ ...supabaseUser, role } as AppUser)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth: !!user, user, session, logout, setUser, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
