// PROVIDERS
import { Providers } from "@/app/providers";

// STYLES
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });

// TYPES
import type { Metadata } from "next";

// METADATA
export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Best tracker in the metaverse!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
