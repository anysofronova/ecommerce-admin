import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/components/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Admin",
  description: "Ecommerce Admin by Anna Sofronova",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} h-full`}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
