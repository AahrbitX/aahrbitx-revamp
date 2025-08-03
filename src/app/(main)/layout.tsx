import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Metadata } from "next";
import { Sora } from "next/font/google";

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
    <div className={`bg-white dark:bg-black ${sora.className}`}>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />

    <script src="http://localhost:8000/static/config.js" defer></script>
      <script
        src="http://localhost:8000/static/widget.js"
        data-client-id="24f3059f-a07a-4894-9be1-1e39d81025f2"
        defer
      ></script>
    </div>
  );
}
