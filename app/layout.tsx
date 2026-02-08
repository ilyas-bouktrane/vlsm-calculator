import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "@fontsource/cascadia-code";
import "@fontsource/cascadia-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "VLSM Calculator",
  description:
    "A tool that helps network engineers efficiently divide an IP network into subnets of varying sizes using Variable Length Subnet Masking (VLSM). It calculates subnet addresses, broadcast addresses, and host ranges for optimized IP allocation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen w-screen flex justify-center">
      <body
        className={`antialiased h-full w-full max-w-[1200px] overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
