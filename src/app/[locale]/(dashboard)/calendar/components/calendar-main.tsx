"use client"

import { useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns"
// ... imports
import { enUS, ptBR } from "date-fns/locale"
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Grid3X3,
  List,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  Users,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Import data
import eventsData from "../data/events.json"
import { type CalendarEvent } from "../types"

interface CalendarMainProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  onMenuClick?: () => void
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

// ... imports

export function CalendarMain({
  selectedDate,
  onDateSelect,
  onMenuClick,
  events,
  onEventClick,
}: CalendarMainProps) {
  const tCalendar = useTranslations("Calendar")
  const tAction = useTranslations("Action")
  const locale = useLocale()
  const dateFnsLocale = locale === "pt" ? ptBR : enUS

  const sampleEvents: CalendarEvent[] =
    events ||
    eventsData.map((event) => ({
      ...event,
      date: new Date(event.date),
      type: event.type as
        | "meeting"
        | "event"
        | "personal"
        | "task"
        | "reminder",
    }))

  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">(
    "month"
  )
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  // Extend to show full weeks (including previous/next month days)
  const calendarStart = new Date(monthStart)
  calendarStart.setDate(calendarStart.getDate() - monthStart.getDay())

  const calendarEnd = new Date(monthEnd)
  calendarEnd.setDate(calendarEnd.getDate() + (6 - monthEnd.getDay()))

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  const getEventsForDay = (date: Date) => {
    return sampleEvents.filter((event) => isSameDay(event.date, date))
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      direction === "prev"
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1)
    )
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event)
    } else {
      setSelectedEvent(event)
      setShowEventDialog(true)
    }
  }

  const renderCalendarGrid = () => {
    const weekDays = [0, 1, 2, 3, 4, 5, 6].map((day) => {
      const d = new Date()
      d.setDate(d.getDate() - d.getDay() + day)
      return format(d, "EEE", { locale: dateFnsLocale })
    })

    return (
      <div className="bg-background flex-1">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-muted-foreground border-r p-4 text-center text-sm font-medium last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Body */}
        <div className="grid flex-1 grid-cols-7">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isDayToday = isToday(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[120px] cursor-pointer border-r border-b p-2 transition-colors last:border-r-0",
                  isCurrentMonth
                    ? "bg-background hover:bg-accent/50"
                    : "bg-muted/30 text-muted-foreground",
                  isSelected && "ring-primary ring-2 ring-inset",
                  isDayToday && "bg-accent/20"
                )}
                onClick={() => onDateSelect?.(day)}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isDayToday &&
                        "bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md text-xs"
                    )}
                  >
                    {format(day, "d", { locale: dateFnsLocale })}
                  </span>
                  {dayEvents.length > 2 && (
                    <span className="text-muted-foreground text-xs">
                      +{dayEvents.length - 2}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "cursor-pointer truncate rounded-sm p-1 text-xs text-white",
                        event.color
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEventClick(event)
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderListView = () => {
    const upcomingEvents = sampleEvents
      .filter((event) => event.date >= new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return (
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleEventClick(event)}
            >
              <CardContent className="px-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn("mt-1.5 h-3 w-3 rounded-full", event.color)}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                        <div className="flex flex-wrap items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(event.date, "MMM d, yyyy", {
                            locale: dateFnsLocale,
                          })}
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <Avatar
                          key={index}
                          className="border-background border-2"
                        >
                          <AvatarFallback className="text-xs">
                            {attendee}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-col flex-wrap gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer xl:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="cursor-pointer"
            >
              {tCalendar("today")}
            </Button>
          </div>

          <h1 className="text-2xl font-semibold">
            {format(currentDate, "MMMM yyyy", { locale: dateFnsLocale })}
          </h1>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder={tCalendar("searchEvents")}
              className="w-64 pl-10"
            />
          </div>

          {/* View Mode Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                {viewMode === "month" && <Grid3X3 className="mr-2 h-4 w-4" />}
                {viewMode === "list" && <List className="mr-2 h-4 w-4" />}
                {viewMode === "month"
                  ? tCalendar("month")
                  : viewMode === "list"
                    ? tCalendar("list")
                    : viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setViewMode("month")}
                className="cursor-pointer"
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                {tCalendar("month")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setViewMode("list")}
                className="cursor-pointer"
              >
                <List className="mr-2 h-4 w-4" />
                {tCalendar("list")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === "month" ? renderCalendarGrid() : renderListView()}

      {/* Event Detail Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.title || tCalendar("eventDetails")}
            </DialogTitle>
            <DialogDescription>{tCalendar("manageEvent")}</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-muted-foreground h-4 w-4" />
                <span>
                  {format(selectedEvent.date, "EEEE, MMMM d, yyyy", {
                    locale: dateFnsLocale,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span>
                  {selectedEvent.time} ({selectedEvent.duration})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground h-4 w-4" />
                <div className="flex items-center gap-2">
                  <span>{tCalendar("attendees")}</span>
                  <div className="flex -space-x-2">
                    {selectedEvent.attendees.map(
                      (attendee: string, index: number) => (
                        <Avatar
                          key={index}
                          className="border-background h-6 w-6 border-2"
                        >
                          <AvatarFallback className="text-xs">
                            {attendee}
                          </AvatarFallback>
                        </Avatar>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("text-white", selectedEvent.color)}
                >
                  {selectedEvent.type}
                </Badge>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setShowEventDialog(false)
                  }}
                >
                  {tAction("edit")}
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setShowEventDialog(false)
                  }}
                >
                  {tAction("delete")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
