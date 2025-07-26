"use client";

import { redirect } from "next/navigation";
import { AppUser } from "@/types/App.types";
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useState } from "react";
import { UserOrganizationType } from "@/types/organizations/Organization";

type AuthOrgContextType = {
  // User Management
  isAuth: boolean;
  user: AppUser | null;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  // Organization User Management
  userOrganizationData: UserOrganizationType[];
  setUserOrganizationData: React.Dispatch<
    React.SetStateAction<UserOrganizationType[]>
  >;
  currentSelector: UserOrganizationType | null;
  setCurrentSelector: React.Dispatch<
    React.SetStateAction<UserOrganizationType | null>
  >;
};

const AuthOrgContext = createContext<AuthOrgContextType>({
  user: null, // Initially no user is logged in
  isAuth: false, // Initially not authenticated
  setUser: () => {}, // Placeholder function, will be set in provider
  logout: () => Promise.resolve(), // Placeholder function, will be set in provider
  userOrganizationData: [],
  setUserOrganizationData: () => {},
  currentSelector: null,
  setCurrentSelector: () => {},
});

export const SupabaseAuthOrgProvider = ({
  children,
  appUser,
  userOrgData,
}: {
  children: React.ReactNode;
  appUser: AppUser | null;
  userOrgData: UserOrganizationType[];
}) => {
  // State to manage the current user
  // This will be set when the user logs in or logs out
  const [user, setUser] = useState<AppUser | null>(appUser);

  // State to manage user organization data
  // This will be set when the user logs in or when organization data is fetched
  const [userOrganizationData, setUserOrganizationData] =
    useState<UserOrganizationType[]>(userOrgData);

  // State to manage the current organization selector
  // This will be set to the first organization by default or null if no organizations are available
  const [currentSelector, setCurrentSelector] =
    useState<UserOrganizationType | null>(
      userOrgData.find((org) => org.user_role === "superadmin") ||
        userOrgData[0]
    );

  // Create a Supabase client instance
  const supabase = createClient();

  // Function to log out the user
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn("Error signing out:", error);
      throw error;
    }
    setUser(null);
    redirect("/");
  };

  return (
    <AuthOrgContext.Provider
      value={{
        // User Management
        user,
        isAuth: !!user,
        logout,
        setUser,
        // Organization User Management
        userOrganizationData,
        setUserOrganizationData,
        currentSelector,
        setCurrentSelector,
      }}
    >
      {children}
    </AuthOrgContext.Provider>
  );
};

export const useAuthOrg = () => useContext(AuthOrgContext);
