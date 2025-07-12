import "./globals.css";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import { createClient } from "@/utils/supabase/server";
import getCurrUser from "@/actions/user/getCurrUser";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const appUser = await getCurrUser(session?.user.id!)

  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-white dark:bg-black ${geist.className}`}>
        <Providers session={session} appUser={appUser}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
