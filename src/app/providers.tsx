"use client";

import { ThemeProvider } from "next-themes";
import { SupabaseAuthProvider } from "@/providers/auth-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseAuthProvider>
      <SmoothScrollProvider>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </SmoothScrollProvider>
    </SupabaseAuthProvider>
  );
}
