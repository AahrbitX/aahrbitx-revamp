"use client";

import { AppUser } from "@/types/App.types";
import { ThemeProvider } from "next-themes";
import { SupabaseAuthOrgProvider } from "@/providers/auth-org-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll";
import { UserOrganizationType } from "@/types/organizations/Organization";

export function Providers({
  children,
  appUser,
  userOrgData,
}: {
  children: React.ReactNode;
  appUser: AppUser | null;
  userOrgData: UserOrganizationType[];
}) {
  return (
    <SmoothScrollProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        <SupabaseAuthOrgProvider appUser={appUser} userOrgData={userOrgData}>
          {children}
        </SupabaseAuthOrgProvider>
      </ThemeProvider>
    </SmoothScrollProvider>
  );
}
