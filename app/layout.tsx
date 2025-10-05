import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const poppins = Poppins({
  weight: ['400', '600', '800'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "InvestAI-Hub",
  description: "your AI Hub page for your stock/crypto marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${poppins.className} antialiased container mx-auto`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange

          >
            <ToastContainer limit={1} autoClose={2000} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}