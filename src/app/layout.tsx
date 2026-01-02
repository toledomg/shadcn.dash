import type { Metadata } from "next"

import "@/app/globals.css"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
