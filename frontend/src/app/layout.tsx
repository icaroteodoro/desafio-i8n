import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['100','200','300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "MinhaLoja - i8n",
  description: "Desafio para vaga de Desenvolvedor Fullstack Jr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
