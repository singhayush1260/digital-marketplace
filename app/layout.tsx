import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { AuthProvider } from "@/context/AuthProvider";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner"
//import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Marketplace",
  description: "A seamless platform for buying, selling, and managing digital goods with secure transactions and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSSRPlugin  routerConfig={extractRouterConfig(ourFileRouter)}/>
        <AuthProvider>
          {/* @ts-expect-error */}
        <Navbar/>
        {children}
        <Toaster/>
        {/* <Footer/> */}
        </AuthProvider>
      </body>
    </html>
  );
}
