import "./globals.css";
import { Geist } from "next/font/google";
import { Providers } from "./providers";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-white dark:bg-black ${geist.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
