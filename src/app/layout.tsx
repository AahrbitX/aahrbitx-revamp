import "./globals.css";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import { createClient } from "@/utils/supabase/server";
import getCurrUser from "@/actions/user/getCurrUser";
import { getUserOrgData } from "@/actions/organizations/getUserOrgData";
import { Toaster } from "@/components/ui/sonner";

import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch the current App user data from view
  const appUser = await getCurrUser(user?.id!);

  // fetch user organization data
  // If user is not logged in, userOrgData will be an empty array
  const userOrgData = appUser?.id ? await getUserOrgData(appUser.id) : [];

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-white dark:bg-black ${geist.className}`}>
        <Providers appUser={appUser} userOrgData={userOrgData}>
          {children}
        </Providers>
        <Toaster />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
