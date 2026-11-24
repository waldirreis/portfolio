import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waldir Reis — Business Intelligence & Analytics",
  description:
    "15+ anos transformando problemas de negócio em resultados. Power BI, SQL, Python e Snowflake. Case Smart Collection apresentado no Google Cloud Power UP 2025.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${space.variable} antialiased`}>{children}</body>
    </html>
  );
}
