"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckSquare,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LayoutPanelLeft,
  Link2,
  Mail,
  MessageCircle,
  Palette,
  Search,
  Settings,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Input
    ref={ref}
    className={cn(
      "mb-4 flex h-12 w-full border-b border-none border-zinc-200 bg-transparent px-4 py-3 text-[17px] outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:placeholder:text-zinc-400",
      className
    )}
    {...props}
  />
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[400px] overflow-x-hidden overflow-y-auto pb-2",
      className
    )}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="flex h-12 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden px-2 not-first:mt-2 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-zinc-500 dark:**:[[cmdk-group-heading]]:text-zinc-400",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-12 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm text-zinc-700 transition-colors outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-zinc-100 data-[selected=true]:text-zinc-900 dark:text-zinc-300 dark:data-[selected=true]:bg-zinc-800 dark:data-[selected=true]:text-zinc-100 [&+[cmdk-item]]:mt-1",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

interface SearchItem {
  title: string
  url: string
  group: string
  icon?: LucideIcon
}

interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter()
  const commandRef = React.useRef<HTMLDivElement>(null)
  const t = useTranslations("Command")
  const tSidebar = useTranslations("Sidebar")
  const tCommon = useTranslations("Common")

  const searchItems: SearchItem[] = [
    // Dashboards
    {
      title: `${tCommon("dashboard")} 1`,
      url: "/dashboard",
      group: tSidebar("dashboards"),
      icon: LayoutDashboard,
    },
    {
      title: `${tCommon("dashboard")} 2`,
      url: "/dashboard-2",
      group: tSidebar("dashboards"),
      icon: LayoutPanelLeft,
    },

    // Apps
    {
      title: tSidebar("mail"),
      url: "/mail",
      group: tSidebar("apps"),
      icon: Mail,
    },
    {
      title: tSidebar("tasks"),
      url: "/tasks",
      group: tSidebar("apps"),
      icon: CheckSquare,
    },
    {
      title: tSidebar("chat"),
      url: "/chat",
      group: tSidebar("apps"),
      icon: MessageCircle,
    },
    {
      title: tSidebar("calendar"),
      url: "/calendar",
      group: tSidebar("apps"),
      icon: Calendar,
    },

    // Auth Pages
    {
      title: `${tSidebar("signIn")} 1`,
      url: "/auth/sign-in",
      group: tSidebar("authPages"),
      icon: Shield,
    },
    {
      title: `${tSidebar("signIn")} 2`,
      url: "/auth/sign-in-2",
      group: tSidebar("authPages"),
      icon: Shield,
    },
    {
      title: `${tSidebar("signUp")} 1`,
      url: "/auth/sign-up",
      group: tSidebar("authPages"),
      icon: Shield,
    },
    {
      title: `${tSidebar("signUp")} 2`,
      url: "/auth/sign-up-2",
      group: tSidebar("authPages"),
      icon: Shield,
    },
    {
      title: `${tSidebar("forgotPassword")} 1`,
      url: "/auth/forgot-password",
      group: tSidebar("authPages"),
      icon: Shield,
    },
    {
      title: `${tSidebar("forgotPassword")} 2`,
      url: "/auth/forgot-password-2",
      group: tSidebar("authPages"),
      icon: Shield,
    },

    // Errors
    {
      title: tSidebar("unauthorized"),
      url: "/errors/unauthorized",
      group: tSidebar("errors"),
      icon: AlertTriangle,
    },
    {
      title: tSidebar("forbidden"),
      url: "/errors/forbidden",
      group: tSidebar("errors"),
      icon: AlertTriangle,
    },
    {
      title: tSidebar("notFound"),
      url: "/errors/not-found",
      group: tSidebar("errors"),
      icon: AlertTriangle,
    },
    {
      title: tSidebar("internalServerError"),
      url: "/errors/internal-server-error",
      group: tSidebar("errors"),
      icon: AlertTriangle,
    },
    {
      title: tSidebar("underMaintenance"),
      url: "/errors/under-maintenance",
      group: tSidebar("errors"),
      icon: AlertTriangle,
    },

    // Settings
    {
      title: tSidebar("userSettings"),
      url: "/settings/user",
      group: tSidebar("settings"),
      icon: User,
    },
    {
      title: tSidebar("accountSettings"),
      url: "/settings/account",
      group: tSidebar("settings"),
      icon: Settings,
    },
    {
      title: tSidebar("plansBilling"),
      url: "/settings/billing",
      group: tSidebar("settings"),
      icon: CreditCard,
    },
    {
      title: tSidebar("appearance"),
      url: "/settings/appearance",
      group: tSidebar("settings"),
      icon: Palette,
    },
    {
      title: tSidebar("notifications"),
      url: "/settings/notifications",
      group: tSidebar("settings"),
      icon: Bell,
    },
    {
      title: tSidebar("connections"),
      url: "/settings/connections",
      group: tSidebar("settings"),
      icon: Link2,
    },

    // Pages
    {
      title: tSidebar("faqs"),
      url: "/faqs",
      group: tSidebar("pages"),
      icon: HelpCircle,
    },
    {
      title: tSidebar("pricing"),
      url: "/pricing",
      group: tSidebar("pages"),
      icon: CreditCard,
    },
  ]

  const groupedItems = searchItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = []
      }
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, SearchItem[]>
  )

  const handleSelect = (url: string) => {
    router.push(url)
    onOpenChange(false)
    // Bounce effect like Vercel
    if (commandRef.current) {
      commandRef.current.style.transform = "scale(0.96)"
      setTimeout(() => {
        if (commandRef.current) {
          commandRef.current.style.transform = ""
        }
      }, 100)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] overflow-hidden border border-zinc-200 p-0 shadow-2xl dark:border-zinc-800">
        <DialogTitle className="sr-only">Command Search</DialogTitle>
        <Command
          ref={commandRef}
          className="transition-transform duration-100 ease-out"
        >
          <CommandInput placeholder={t("placeholder")} autoFocus />
          <CommandList>
            <CommandEmpty>{t("noResults")}</CommandEmpty>
            {Object.entries(groupedItems).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <CommandItem
                      key={item.url}
                      value={`${item.title} ${item.group}`}
                      onSelect={() => handleSelect(item.url)}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const t = useTranslations("Command")
  return (
    <button
      onClick={onClick}
      className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground relative inline-flex h-8 w-full items-center justify-start gap-2 rounded-md border px-3 py-1 text-sm font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-36 lg:w-56"
    >
      <Search className="mr-2 h-3.5 w-3.5" />
      <span className="hidden lg:inline-flex">{t("searchPlaceholder")}</span>
      <span className="inline-flex lg:hidden">{t("searchTooltip")}</span>
      <kbd className="bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-4 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
