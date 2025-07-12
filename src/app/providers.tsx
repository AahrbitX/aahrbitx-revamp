"use client";

import { ThemeProvider } from "next-themes";
import { SupabaseAuthProvider } from "@/providers/auth-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll";
import { Session } from "@supabase/supabase-js";
import { AppUser } from "@/types/App.types";

export function Providers({ children, session, appUser }: { children: React.ReactNode, session: Session | null, appUser: AppUser | null }) {
  return (
    <SupabaseAuthProvider session={session} appUser={appUser}>
      <SmoothScrollProvider>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </SmoothScrollProvider>
    </SupabaseAuthProvider>
  );
}
