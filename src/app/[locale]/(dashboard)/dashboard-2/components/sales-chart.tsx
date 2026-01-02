"use client"

import React, { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SalesChart() {
  const tDashboard = useTranslations("Dashboard")
  const locale = useLocale()
  const [timeRange, setTimeRange] = useState("12m")

  const salesData = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(new Date().getFullYear(), i, 1)
      const monthName = new Intl.DateTimeFormat(locale, {
        month: "short",
      }).format(date)
      return {
        month: monthName,
        sales: [
          12500, 18200, 16800, 22400, 24600, 28200, 31500, 29800, 33200, 35100,
          38900, 42300,
        ][i],
        target: [
          15000, 15000, 15000, 20000, 20000, 25000, 25000, 25000, 30000, 30000,
          35000, 35000,
        ][i],
      }
    })
  }, [locale])

  const chartConfig = {
    sales: {
      label: tDashboard("sales"),
      color: "var(--primary)",
    },
    target: {
      label: tDashboard("target"),
      color: "var(--primary)",
    },
  }

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{tDashboard("salesPerformance")}</CardTitle>
          <CardDescription>{tDashboard("monthlySalesTarget")}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m" className="cursor-pointer">
                {tDashboard("last3Months")}
              </SelectItem>
              <SelectItem value="6m" className="cursor-pointer">
                {tDashboard("last6Months")}
              </SelectItem>
              <SelectItem value="12m" className="cursor-pointer">
                {tDashboard("last12Months")}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="cursor-pointer">
            {tDashboard("export")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <div className="px-6 pb-6">
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sales)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-target)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-target)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="target"
                stackId="1"
                stroke="var(--color-target)"
                fill="url(#colorTarget)"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stackId="2"
                stroke="var(--color-sales)"
                fill="url(#colorSales)"
                strokeWidth={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
