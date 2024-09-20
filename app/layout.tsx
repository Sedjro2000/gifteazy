'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar"; 
import Footer from "../components/ui/Footer"; 
import { ListProvider } from "../context/ListsContext"; 
import { usePathname } from "next/navigation";
import { metadata } from "@/metadata";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();


  const excludedPaths = ["/signin"];

  const hideNavbarAndFooter = excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {!hideNavbarAndFooter && <Navbar />}
        <ListProvider>
          {children}
        </ListProvider>
        {!hideNavbarAndFooter && <Footer />} 
      </body>
    </html>
  );
}
