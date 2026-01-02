import { ArrowRight, Clock, Shield, Sparkles, Truck } from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const iconMap = {
  Sparkles,
  Shield,
  Truck,
  Clock,
}

export function FeaturesGrid() {
  const t = useTranslations("Faq.Features")

  const features = [
    {
      id: 1,
      title: t("premiumQuality"),
      description: t("premiumDesc"),
      icon: "Sparkles",
    },
    {
      id: 2,
      title: t("secureShopping"),
      description: t("secureDesc"),
      icon: "Shield",
    },
    {
      id: 3,
      title: t("fastDelivery"),
      description: t("fastDesc"),
      icon: "Truck",
    },
    {
      id: 4,
      title: t("support"),
      description: t("supportDesc"),
      icon: "Clock",
    },
  ]

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {features.map((feature) => {
        const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
        return (
          <article key={feature.id} className="group">
            <Card className="relative h-full overflow-hidden transition-all hover:shadow-md">
              <CardContent className="px-6">
                <Badge
                  variant="secondary"
                  className="mb-4 inline-flex size-12 items-center justify-center"
                >
                  <IconComponent className="size-5!" aria-hidden="true" />
                </Badge>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {feature.description}
                </p>

                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0! text-sm"
                >
                  {t("learnMore")}
                  <ArrowRight className="ms-1.5 size-4" />
                </Button>
              </CardContent>
            </Card>
          </article>
        )
      })}
    </div>
  )
}
