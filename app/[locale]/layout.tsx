import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { DEFAULT_PAGE_WIDTH } from "@/lib/constants";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";

import "@fontsource/cascadia-code";
import "@fontsource/cascadia-mono";
import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "VLSM Calculator",
  description:
    "A tool that helps network engineers efficiently divide an IP network into subnets of varying sizes using Variable Length Subnet Masking (VLSM). It calculates subnet addresses, broadcast addresses, and host ranges for optimized IP allocation.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`antialiased mx-auto h-full`}
        style={{ maxWidth: DEFAULT_PAGE_WIDTH }}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
