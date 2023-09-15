import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repair Zone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="mx-10">
      <body className={inter.className}>
        <Providers>
          <div>
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
// className={inter.className}
