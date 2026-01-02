"use client"

import { useState } from "react"
import {
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CalendarItem {
  id: string
  name: string
  color: string
  visible: boolean
  type: "personal" | "work" | "shared"
}

interface CalendarGroup {
  name: string
  items: CalendarItem[]
}

interface CalendarsProps {
  calendars?: {
    name: string
    items: string[]
  }[]
  onCalendarToggle?: (calendarId: string, visible: boolean) => void
  onCalendarEdit?: (calendarId: string) => void
  onCalendarDelete?: (calendarId: string) => void
  onNewCalendar?: () => void
}

// Enhanced calendar data with colors and visibility
const enhancedCalendars: CalendarGroup[] = [
  {
    name: "My Calendars",
    items: [
      {
        id: "personal",
        name: "Personal",
        color: "bg-blue-500",
        visible: true,
        type: "personal",
      },
      {
        id: "work",
        name: "Work",
        color: "bg-green-500",
        visible: true,
        type: "work",
      },
      {
        id: "family",
        name: "Family",
        color: "bg-pink-500",
        visible: true,
        type: "personal",
      },
    ],
  },
  {
    name: "Favorites",
    items: [
      {
        id: "holidays",
        name: "Holidays",
        color: "bg-red-500",
        visible: true,
        type: "shared",
      },
      {
        id: "birthdays",
        name: "Birthdays",
        color: "bg-purple-500",
        visible: true,
        type: "personal",
      },
    ],
  },
  {
    name: "Other",
    items: [
      {
        id: "travel",
        name: "Travel",
        color: "bg-orange-500",
        visible: false,
        type: "personal",
      },
      {
        id: "reminders",
        name: "Reminders",
        color: "bg-yellow-500",
        visible: true,
        type: "personal",
      },
      {
        id: "deadlines",
        name: "Deadlines",
        color: "bg-red-600",
        visible: true,
        type: "work",
      },
    ],
  },
]

export function Calendars({
  onCalendarToggle,
  onCalendarEdit,
  onCalendarDelete,
  onNewCalendar,
}: CalendarsProps) {
  const [calendarData, setCalendarData] = useState(enhancedCalendars)

  const handleToggleVisibility = (calendarId: string) => {
    setCalendarData((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === calendarId ? { ...item, visible: !item.visible } : item
        ),
      }))
    )

    const calendar = calendarData
      .flatMap((g) => g.items)
      .find((c) => c.id === calendarId)
    if (calendar) {
      onCalendarToggle?.(calendarId, !calendar.visible)
    }
  }

  return (
    <div className="space-y-4">
      {calendarData.map((calendar, index) => (
        <div key={calendar.name}>
          <Collapsible defaultOpen={index === 0} className="group/collapsible">
            <CollapsibleTrigger className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center justify-between rounded-md p-2">
              <span className="text-sm font-medium">{calendar.name}</span>
              <div className="flex items-center gap-1">
                {index === 0 && (
                  <div
                    className="hover:bg-accent flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm opacity-0 group-hover/collapsible:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNewCalendar?.()
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </div>
                )}
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {calendar.items.map((item) => (
                  <div key={item.id} className="group/calendar-item">
                    <div className="hover:bg-accent/50 flex items-center justify-between rounded-md p-2">
                      <div className="flex flex-1 items-center gap-3">
                        {/* Calendar Color & Visibility Toggle */}
                        <button
                          onClick={() => handleToggleVisibility(item.id)}
                          className={cn(
                            "flex aspect-square size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-all",
                            item.visible
                              ? cn("border-transparent text-white", item.color)
                              : "border-border bg-transparent"
                          )}
                        >
                          {item.visible && <Check className="size-3" />}
                        </button>

                        {/* Calendar Name */}
                        <span
                          className={cn(
                            "flex-1 cursor-pointer truncate text-sm",
                            !item.visible && "text-muted-foreground"
                          )}
                          onClick={() => handleToggleVisibility(item.id)}
                        >
                          {item.name}
                        </span>

                        {/* Visibility Icon */}
                        <div className="opacity-0 group-hover/calendar-item:opacity-100">
                          {item.visible ? (
                            <Eye className="text-muted-foreground h-3 w-3" />
                          ) : (
                            <EyeOff className="text-muted-foreground h-3 w-3" />
                          )}
                        </div>

                        {/* More Options */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div
                              className="hover:bg-accent flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm p-0 opacity-0 group-hover/calendar-item:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="right">
                            <DropdownMenuItem
                              onClick={() => onCalendarEdit?.(item.id)}
                              className="cursor-pointer"
                            >
                              Edit calendar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleVisibility(item.id)}
                              className="cursor-pointer"
                            >
                              {item.visible ? "Hide" : "Show"} calendar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onCalendarDelete?.(item.id)}
                              className="text-destructive cursor-pointer"
                            >
                              Delete calendar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
