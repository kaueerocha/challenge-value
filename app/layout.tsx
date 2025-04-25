import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Challenge - Value",
  description: "Listagem de Vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col h-full">
            <Header />
            {children}
            <Toaster theme="system" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
