import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classes from "./layout.module.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MSWProvider } from "@/mocks/MSWProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIISE CS Top Conference List World Ranking",
  description: "KIISE CS Top Conference List World Ranking",
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
