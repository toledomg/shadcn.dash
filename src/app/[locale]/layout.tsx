import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import "@/app/globals.css"

import { routing } from "@/i18n/routing"

import { inter } from "@/lib/fonts"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: {
    default: "Shadcn Dashboard",
    template: "%s | Shadcn Dashboard",
  },
  description: "A professional dashboard built with Next.js 15 and Shadcn UI",
  keywords: ["dashboard", "next.js", "react", "shadcn", "ui", "typescript"],
  authors: [{ name: "Financial Dash Team" }],
  creator: "Financial Dash",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
