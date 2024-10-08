'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar"; 
import Footer from "../components/ui/Footer"; 
import { ListProvider } from "../context/ListsContext"; 
import { CartProvider } from "@/context/CartContext";
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

  
  const excludedPaths = ["/auth/signin", "/merchantProfile"];
  const hideNavbarAndFooter = excludedPaths.includes(pathname);
  const isDashboard = pathname?.startsWith('/dashboard');
  
 
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
          <ListProvider>
            <CartProvider>
              {/* Navbar */}
              {!hideNavbarAndFooter && !isDashboard && <Navbar />}
              {children}
              {/* Footer */}
              {!hideNavbarAndFooter && !isDashboard && <Footer />} 
            </CartProvider>
          </ListProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
