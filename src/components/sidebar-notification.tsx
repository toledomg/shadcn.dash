"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Logo } from "./logo"

export function SidebarNotification() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <Card className="mb-3 border-neutral-200 bg-neutral-50 py-0 dark:border-neutral-700 dark:bg-neutral-800">
      <CardContent className="relative p-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close notification</span>
        </Button>

        <div className="pr-6">
          <h3 className="mt-1 mb-2 flex items-center gap-3 font-semibold text-neutral-900 dark:text-neutral-100">
            <Logo size={42} className="-mt-1" />
            <div>
              Welcome to{" "}
              <a
                href="https://shadcnstore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ShadcnStore
              </a>
            </div>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed dark:text-neutral-400">
            Explore our premium Shadcn UI{" "}
            <a
              href="https://shadcnstore.com/blocks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              blocks
            </a>{" "}
            to build your next project faster.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
