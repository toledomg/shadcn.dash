"use client"

import {
  Bell,
  BellOff,
  Info,
  MoreVertical,
  Phone,
  Search,
  Users,
  Video,
} from "lucide-react"
// ... imports
import { useLocale, useTranslations } from "next-intl"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { type Conversation, type User } from "../use-chat"

interface ChatHeaderProps {
  conversation: Conversation | null
  users: User[]
  onToggleMute?: () => void
  onToggleInfo?: () => void
}

export function ChatHeader({
  conversation,
  users,
  onToggleMute,
  onToggleInfo,
}: ChatHeaderProps) {
  const tChat = useTranslations("Chat")
  const locale = useLocale()

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{tChat("selectConversation")}</p>
      </div>
    )
  }

  const getConversationUsers = () => {
    if (conversation.type === "direct") {
      return users.filter((user) => conversation.participants.includes(user.id))
    }
    return users.filter((user) => conversation.participants.includes(user.id))
  }

  const conversationUsers = getConversationUsers()
  const primaryUser = conversationUsers[0]

  const getStatusText = () => {
    if (conversation.type === "group") {
      const onlineCount = conversationUsers.filter(
        (user) => user.status === "online"
      ).length
      return tChat("members", {
        count: conversation.participants.length,
        online: onlineCount,
      })
    } else if (primaryUser) {
      switch (primaryUser.status) {
        case "online":
          return tChat("activeNow")
        case "away":
          return tChat("away")
        case "offline":
          return tChat("lastSeen", {
            date: new Date(primaryUser.lastSeen).toLocaleDateString(locale),
          })
        default:
          return ""
      }
    }
    return ""
  }

  const getStatusColor = () => {
    if (conversation.type === "group") return "text-muted-foreground"

    switch (primaryUser?.status) {
      case "online":
        return "text-green-600"
      case "away":
        return "text-yellow-600"
      case "offline":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="flex h-full items-center justify-between">
      {/* Left side - Avatar and info */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>
            {conversation.type === "group" ? (
              <Users className="h-5 w-5" />
            ) : (
              conversation.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
            )}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-semibold">{conversation.name}</h2>
            {conversation.isMuted && (
              <BellOff className="text-muted-foreground h-4 w-4" />
            )}
            {conversation.type === "group" && (
              <Badge variant="secondary" className="cursor-pointer text-xs">
                {tChat("group")}
              </Badge>
            )}
          </div>
          <p className={`text-sm ${getStatusColor()}`}>{getStatusText()}</p>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-1">
        <TooltipProvider>
          {/* Search */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tChat("searchInConversation")}</p>
            </TooltipContent>
          </Tooltip>

          {/* Phone call */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Phone className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tChat("voiceCall")}</p>
            </TooltipContent>
          </Tooltip>

          {/* Video call */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Video className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tChat("videoCall")}</p>
            </TooltipContent>
          </Tooltip>

          {/* Info */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleInfo}
                className="cursor-pointer"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tChat("conversationInfo")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* More options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onToggleMute} className="cursor-pointer">
              {conversation.isMuted ? (
                <>
                  <Bell className="mr-2 h-4 w-4" />
                  {tChat("unmuteConversation")}
                </>
              ) : (
                <>
                  <BellOff className="mr-2 h-4 w-4" />
                  {tChat("muteConversation")}
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Search className="mr-2 h-4 w-4" />
              {tChat("searchMessages")}
            </DropdownMenuItem>
            {conversation.type === "group" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  {tChat("manageMembers")}
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer">
              {tChat("deleteConversation")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
