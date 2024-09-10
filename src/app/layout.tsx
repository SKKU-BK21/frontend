import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classes from "./layout.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIISE 학회/논문 통계 서비스",
  description: "한국정보과학회 학회/논문 통계 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <section className={classes.wrapper}>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
