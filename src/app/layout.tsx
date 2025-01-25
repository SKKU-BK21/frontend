import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classes from "./layout.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MSWProvider } from "@/mocks/MSWProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIISE 우수학술대회 목록 국가별 통계",
  description: "한국정보과학회 우수학술대회 목록 국가별 통계",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWProvider>
          <Header />
          <section className={classes.wrapper}>{children}</section>
          <Footer />
        </MSWProvider>
      </body>
    </html>
  );
}
