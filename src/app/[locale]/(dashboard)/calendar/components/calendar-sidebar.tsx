"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Calendars } from "./calendars"
import { DatePicker } from "./date-picker"

interface CalendarSidebarProps {
  selectedDate?: Date
  onDateSelect?: (date: Date) => void
  onNewCalendar?: () => void
  onNewEvent?: () => void
  events?: Array<{ date: Date; count: number }>
  className?: string
}

export function CalendarSidebar({
  selectedDate,
  onDateSelect,
  onNewCalendar,
  onNewEvent,
  events = [],
  className,
}: CalendarSidebarProps) {
  return (
    <div
      className={`bg-background flex h-full flex-col rounded-lg ${className}`}
    >
      {/* Add New Event Button */}
      <div className="border-b p-6">
        <Button className="w-full cursor-pointer" onClick={onNewEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Event
        </Button>
      </div>

      {/* Date Picker */}
      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        events={events}
      />

      <Separator />

      {/* Calendars */}
      <div className="flex-1 p-4">
        <Calendars
          onNewCalendar={onNewCalendar}
          onCalendarToggle={(calendarId, visible) => {
            console.log(`Calendar ${calendarId} visibility: ${visible}`)
          }}
          onCalendarEdit={(calendarId) => {
            console.log(`Edit calendar: ${calendarId}`)
          }}
          onCalendarDelete={(calendarId) => {
            console.log(`Delete calendar: ${calendarId}`)
          }}
        />
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full cursor-pointer justify-start"
          onClick={onNewCalendar}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Calendar
        </Button>
      </div>
    </div>
  )
}
