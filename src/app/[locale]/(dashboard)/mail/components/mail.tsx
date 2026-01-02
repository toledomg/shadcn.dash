"use client"

import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { type Mail } from "../data"
import { useMail } from "../use-mail"
import { AccountSwitcher } from "./account-switcher"
import { MailDisplay } from "./mail-display"
import { MailList } from "./mail-list"
import { Nav } from "./nav"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [mail] = useMail()
  const t = useTranslations("Mail")
  const tCommon = useTranslations("Common")

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
        }}
        className="h-full items-stretch overflow-hidden rounded-lg border"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }}
          className={cn(
            isCollapsed && "w-full transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator className="mx-0" />
          <div className="m-3">
            <Button className="w-full cursor-pointer">
              {isCollapsed ? "" : "Compose"}
              <Send className="size-4" />
            </Button>
          </div>
          <Separator className="mx-0" />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: t("inbox"),
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: t("drafts"),
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: t("sent"),
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: t("junk"),
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: t("trash"),
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: t("archive"),
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator className="mx-0" />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: t("social"),
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: t("updates"),
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: t("forums"),
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: t("shopping"),
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: t("promotions"),
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all" className="gap-1">
            <div className="flex items-center px-4 py-1.5">
              <h1 className="text-foreground text-xl font-bold">
                {t("inbox")}
              </h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="all" className="cursor-pointer">
                  {tCommon("all")}
                </TabsTrigger>
                <TabsTrigger value="unread" className="cursor-pointer">
                  {t("markAsUnread")}
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 supports-backdrop-filter:bg-background/60 p-4 backdrop-blur">
              <form>
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2 size-4 cursor-pointer" />
                  <Input
                    placeholder={t("search")}
                    className="cursor-text pl-8"
                  />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
