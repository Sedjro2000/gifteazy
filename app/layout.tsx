'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar"; 
import Footer from "../components/ui/Footer"; 
import { ListProvider } from "../context/ListsContext"; 
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { metadata } from "@/metadata";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  
  const excludedPaths = ["/signin", "/merchantProfile"];
  const hideNavbarAndFooter = excludedPaths.includes(pathname);
  const isDashboard = pathname?.startsWith('/dashboard');
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {/* Affiche le Navbar seulement si on n'est pas sur les chemins exclus ou sur le dashboard */}
          {!hideNavbarAndFooter && !isDashboard && <Navbar />}
          <ListProvider>
            {children}
          </ListProvider>
          {/* Affiche le Footer seulement si on n'est pas sur les chemins exclus ou sur le dashboard */}
          {!hideNavbarAndFooter && !isDashboard && <Footer />} 
        </SessionProvider>
      </body>
    </html>
  );
}
