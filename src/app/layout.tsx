import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Sora } from "next/font/google";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AahrbitX°",
    default: "AahrbitX°",
  },
  description:
    "Transform your business with advanced IoT solutions, AI-powered tools, and tailored SaaS products like HRM, HMS, CRM, ERP, and CMS. Based in Nalloorkonam, Arumanai, Kanyakumari, Tamil Nadu, India, we deliver innovative tech solutions globally. Leverage our EdgeTeam for dedicated tech experts and OAAS for end-to-end operational support. Partner with the best AI, IoT, and software solution providers to enhance business efficiency and achieve seamless growth",
  metadataBase: new URL("https://aahrbitx.in"),
  openGraph: {
    type: "website",
    url: "https://aahrbitx.in",
    title: "AarbhitX",
    description:
      "AI solutions for streamlined operations, enhanced decisions, and scalable growth. We unlock your full potential with intelligent automation and data-driven insights",
    siteName: "AarbhitX",
    images: [
      {
        url: "https://k0wq6pnnph6kt8et.public.blob.vercel-storage.com/aahrbitx/aahrbitx_meta_images-DeG1eHIDn5ppeJXCaQgZV6zOPzRaqX.png",
      },
    ],
  },
};

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-white dark:bg-black ${sora.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
