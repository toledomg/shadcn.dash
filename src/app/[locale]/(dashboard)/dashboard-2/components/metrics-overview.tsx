"use client"

import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MetricsOverview() {
  const tDashboard = useTranslations("Dashboard")

  const metrics = [
    {
      title: tDashboard("totalRevenue"),
      value: "$54,230",
      description: tDashboard("monthlyRevenue"),
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      footer: tDashboard("trendingUp"),
      subfooter: tDashboard("revenueLast6Months"),
    },
    {
      title: tDashboard("activeCustomers"),
      value: "2,350",
      description: tDashboard("totalActiveUsers"),
      change: "+5.2%",
      trend: "up",
      icon: Users,
      footer: tDashboard("strongRetention"),
      subfooter: tDashboard("engagementTargets"),
    },
    {
      title: tDashboard("totalOrders"),
      value: "1,247",
      description: tDashboard("ordersThisMonth"),
      change: "-2.1%",
      trend: "down",
      icon: ShoppingCart,
      footer: tDashboard("downPeriod"),
      subfooter: tDashboard("orderVolume"),
    },
    {
      title: tDashboard("conversionRate"),
      value: "3.24%",
      description: tDashboard("avgConversion"),
      change: "+8.3%",
      trend: "up",
      icon: BarChart3,
      footer: tDashboard("steadyPerformance"),
      subfooter: tDashboard("meetsProjections"),
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 @5xl:grid-cols-4">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={metric.title} className="cursor-pointer">
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="h-4 w-4" />
                  {metric.change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.footer} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{metric.subfooter}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
