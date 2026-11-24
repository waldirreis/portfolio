import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waldir Reis — Business Intelligence & Analytics",
  description:
    "15+ anos transformando problemas de negócio em resultados. Power BI, SQL, Python e Snowflake. Case Smart Collection apresentado no Google Cloud Power UP 2025.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${plex.variable} ${bricolage.variable} antialiased`}>{children}</body>
    </html>
  );
}
