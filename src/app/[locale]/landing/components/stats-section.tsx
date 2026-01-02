"use client"

import { Download, Package, Star, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { DotPattern } from "@/components/dot-pattern"

const stats = [
  {
    icon: Package,
    value: "500+",
    label: "Components",
    description: "Ready-to-use blocks",
  },
  {
    icon: Download,
    value: "25K+",
    label: "Downloads",
    description: "Trusted worldwide",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Developers",
    description: "Active community",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Rating",
    description: "User satisfaction",
  },
]

export function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16">
      {/* Background with transparency */}
      <div className="from-primary/8 to-secondary/20 absolute inset-0 bg-gradient-to-r via-transparent" />
      <DotPattern className="opacity-75" size="md" fadeStyle="circle" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-background/60 border-border/50 py-0 text-center backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <stat.icon className="text-primary h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-foreground text-2xl font-bold sm:text-3xl">
                    {stat.value}
                  </h3>
                  <p className="text-foreground font-semibold">{stat.label}</p>
                  <p className="text-muted-foreground text-sm">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
