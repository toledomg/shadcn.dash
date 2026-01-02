"use client"

import {
  Bell,
  Clock,
  Download,
  Plus,
  Settings,
  Share,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface QuickActionsProps {
  onNewEvent?: () => void
  onNewMeeting?: () => void
  onNewReminder?: () => void
  onSettings?: () => void
}

export function QuickActions({
  onNewEvent,
  onNewMeeting,
  onNewReminder,
  onSettings,
}: QuickActionsProps) {
  const quickStats = [
    { label: "Today's Events", value: "3", color: "bg-blue-500" },
    { label: "This Week", value: "12", color: "bg-green-500" },
    { label: "Pending", value: "2", color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${stat.color}`} />
                <span className="text-muted-foreground text-sm">
                  {stat.label}
                </span>
              </div>
              <Badge variant="secondary">{stat.value}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full cursor-pointer justify-start"
            onClick={onNewEvent}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer justify-start"
            onClick={onNewMeeting}
          >
            <Users className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer justify-start"
            onClick={onNewReminder}
          >
            <Bell className="mr-2 h-4 w-4" />
            Set Reminder
          </Button>

          <Separator className="my-3" />

          <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer justify-start"
          >
            <Share className="mr-2 h-4 w-4" />
            Share Calendar
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer justify-start"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full cursor-pointer justify-start"
            onClick={onSettings}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Next Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Team Standup</p>
                <p className="text-muted-foreground text-xs">
                  9:00 AM • Conference Room A
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-purple-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Design Review</p>
                <p className="text-muted-foreground text-xs">
                  2:00 PM • Virtual
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
