"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"

import {
  useChat,
  type Conversation,
  type Message,
  type User,
} from "../use-chat"
import { ChatHeader } from "./chat-header"
import { ConversationList } from "./conversation-list"
import { MessageInput } from "./message-input"
import { MessageList } from "./message-list"

interface ChatProps {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  users: User[]
}

export function Chat({ conversations, messages, users }: ChatProps) {
  const {
    selectedConversation,
    setSelectedConversation,
    setConversations,
    setMessages,
    setUsers,
    addMessage,
    toggleMute,
  } = useChat()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" ? window.innerWidth : 0 >= 1024) {
        // lg breakpoint
        setIsSidebarOpen(false)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  // Initialize data
  useEffect(() => {
    setConversations(conversations)
    setUsers(users)

    // Set messages for all conversations
    Object.entries(messages).forEach(
      ([conversationId, conversationMessages]) => {
        setMessages(conversationId, conversationMessages)
      }
    )

    // Auto-select first conversation if none selected
    if (!selectedConversation && conversations.length > 0) {
      setSelectedConversation(conversations[0].id)
    }
  }, [
    conversations,
    messages,
    users,
    selectedConversation,
    setConversations,
    setMessages,
    setUsers,
    setSelectedConversation,
  ])

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation
  )
  const currentMessages = selectedConversation
    ? messages[selectedConversation] || []
    : []

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      senderId: "current-user",
      type: "text" as const,
      isEdited: false,
      reactions: [],
      replyTo: null,
    }

    addMessage(selectedConversation, newMessage)
  }

  const handleToggleMute = () => {
    if (selectedConversation) {
      toggleMute(selectedConversation)
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="bg-background flex h-full max-h-[calc(100vh-200px)] min-h-[600px] overflow-hidden rounded-lg border">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Conversations Sidebar - Responsive */}
        <div
          className={`bg-background w-100 flex-shrink-0 border-r ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:relative lg:block`}
        >
          {/* Sidebar Header with Close Button (Mobile Only) */}
          <div className="bg-background flex items-center justify-between border-b p-4 lg:hidden">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={(id) => {
              setSelectedConversation(id)
              setIsSidebarOpen(false) // Close sidebar on mobile after selection
            }}
          />
        </div>

        {/* Chat Panel - Flexible Width */}
        <div className="bg-background flex min-w-0 flex-1 flex-col">
          {/* Chat Header with Hamburger Menu */}
          <div className="bg-background flex h-16 items-center border-b px-4">
            {/* Hamburger Menu Button - Only visible when sidebar is hidden on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 cursor-pointer lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <ChatHeader
                conversation={currentConversation || null}
                users={users}
                onToggleMute={handleToggleMute}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex min-h-0 flex-1 flex-col">
            {selectedConversation ? (
              <>
                <MessageList messages={currentMessages} users={users} />

                {/* Message Input */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder={`Message ${currentConversation?.name || ""}...`}
                />
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-semibold">
                    Welcome to Chat
                  </h3>
                  <p className="text-muted-foreground">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
