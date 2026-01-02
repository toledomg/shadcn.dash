"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import {
  AlertTriangle,
  Calendar,
  CheckSquare,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LayoutPanelLeft,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarNotification } from "@/components/sidebar-notification"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const tCommon = useTranslations("Common")
  const tSidebar = useTranslations("Sidebar")

  const data = {
    user: {
      name: "ShadcnStore",
      email: "store@example.com",
      avatar: "",
    },
    navGroups: [
      {
        label: tSidebar("dashboards"),
        items: [
          {
            title: tCommon("dashboard") + " 1",
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: tCommon("dashboard") + " 2",
            url: "/dashboard-2",
            icon: LayoutPanelLeft,
          },
        ],
      },
      {
        label: tSidebar("apps"),
        items: [
          {
            title: tSidebar("mail"),
            url: "/mail",
            icon: Mail,
          },
          {
            title: tSidebar("tasks"),
            url: "/tasks",
            icon: CheckSquare,
          },
          {
            title: tSidebar("chat"),
            url: "/chat",
            icon: MessageCircle,
          },
          {
            title: tSidebar("calendar"),
            url: "/calendar",
            icon: Calendar,
          },
          {
            title: tSidebar("users"),
            url: "/users",
            icon: Users,
          },
        ],
      },
      {
        label: tSidebar("pages"),
        items: [
          {
            title: tCommon("landingPage"),
            url: "/landing",
            target: "_blank",
            icon: LayoutTemplate,
          },
          {
            title: tSidebar("authPages"),
            url: "#",
            icon: Shield,
            items: [
              {
                title: tSidebar("signIn") + " 1",
                url: "/sign-in",
              },
              {
                title: tSidebar("signIn") + " 2",
                url: "/sign-in-2",
              },
              {
                title: tSidebar("signIn") + " 3",
                url: "/sign-in-3",
              },
              {
                title: tSidebar("signUp") + " 1",
                url: "/sign-up",
              },
              {
                title: tSidebar("signUp") + " 2",
                url: "/sign-up-2",
              },
              {
                title: tSidebar("signUp") + " 3",
                url: "/sign-up-3",
              },
              {
                title: tSidebar("forgotPassword") + " 1",
                url: "/forgot-password",
              },
              {
                title: tSidebar("forgotPassword") + " 2",
                url: "/forgot-password-2",
              },
              {
                title: tSidebar("forgotPassword") + " 3",
                url: "/forgot-password-3",
              },
            ],
          },
          {
            title: tSidebar("errors"),
            url: "#",
            icon: AlertTriangle,
            items: [
              {
                title: tSidebar("unauthorized"),
                url: "/errors/unauthorized",
              },
              {
                title: tSidebar("forbidden"),
                url: "/errors/forbidden",
              },
              {
                title: tSidebar("notFound"),
                url: "/errors/not-found",
              },
              {
                title: tSidebar("internalServerError"),
                url: "/errors/internal-server-error",
              },
              {
                title: tSidebar("underMaintenance"),
                url: "/errors/under-maintenance",
              },
            ],
          },
          {
            title: tSidebar("settings"),
            url: "#",
            icon: Settings,
            items: [
              {
                title: tSidebar("userSettings"),
                url: "/settings/user",
              },
              {
                title: tSidebar("accountSettings"),
                url: "/settings/account",
              },
              {
                title: tSidebar("plansBilling"),
                url: "/settings/billing",
              },
              {
                title: tSidebar("appearance"),
                url: "/settings/appearance",
              },
              {
                title: tSidebar("notifications"),
                url: "/settings/notifications",
              },
              {
                title: tSidebar("connections"),
                url: "/settings/connections",
              },
            ],
          },
          {
            title: tSidebar("faqs"),
            url: "/faqs",
            icon: HelpCircle,
          },
          {
            title: tSidebar("pricing"),
            url: "/pricing",
            icon: CreditCard,
          },
        ],
      },
    ],
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ShadcnStore</span>
                  <span className="truncate text-xs">
                    {tSidebar("adminDashboard")}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarNotification />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
