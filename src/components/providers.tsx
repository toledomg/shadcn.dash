"use client"

import * as React from "react"
import { SidebarConfigProvider } from "@/contexts/sidebar-context"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
      <SidebarConfigProvider>{children}</SidebarConfigProvider>
      <Toaster />
    </ThemeProvider>
  )
}
