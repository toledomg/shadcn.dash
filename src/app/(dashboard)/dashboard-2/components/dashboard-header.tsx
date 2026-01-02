"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, RefreshCw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function DashboardHeader() {
  const [dateRange, setDateRange] = useState("30d")
  const lastUpdated = new Date().toLocaleString()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">
              Business Dashboard
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Comprehensive overview of your business performance and key
              metrics
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="cursor-pointer">
              <Clock className="mr-1 h-3 w-3" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">Date Range:</span>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d" className="cursor-pointer">
                    Last 7 days
                  </SelectItem>
                  <SelectItem value="30d" className="cursor-pointer">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="90d" className="cursor-pointer">
                    Last 90 days
                  </SelectItem>
                  <SelectItem value="1y" className="cursor-pointer">
                    Last year
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="text-muted-foreground text-sm">
            Last updated: {lastUpdated}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
