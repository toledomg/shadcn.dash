"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with essential components",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Access to 50+ free components",
      "Basic dashboard templates",
      "Community support",
      "GitHub repository access",
      "Documentation and guides",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For developers who need premium templates and components",
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      "Premium template collection",
      "Advanced dashboard layouts",
      "Priority support",
      "Commercial use license",
      "Early access to new releases",
      "Figma design files",
      "Custom component requests",
      "Direct developer access",
      "Exclusive design resources",
    ],
    cta: "Get Started",
    popular: true,
    includesPrevious: "All Free features, plus",
  },
  {
    name: "Lifetime",
    description: "One-time payment for lifetime access to everything",
    monthlyPrice: 299,
    yearlyPrice: 299,
    features: [
      "Lifetime updates and support",
      "Private Discord channel",
      "No recurring fees ever",
      "Future template access",
      "VIP support priority",
      "Exclusive beta features",
    ],
    cta: "Get Started",
    popular: false,
    includesPrevious: "All Pro features, plus",
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="bg-muted/40 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Pricing Plans
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your plan
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start building with our free components or upgrade to Pro for access
            to premium templates and advanced features.
          </p>

          {/* Billing Toggle */}
          <div className="mb-2 flex items-center justify-center">
            <ToggleGroup
              type="single"
              value={isYearly ? "yearly" : "monthly"}
              onValueChange={(value) => setIsYearly(value === "yearly")}
              className="bg-secondary text-secondary-foreground cursor-pointer rounded-full border-none p-1 shadow-none"
            >
              <ToggleGroupItem
                value="monthly"
                className="data-[state=on]:bg-background data-[state=on]:border-border data-[state=on]:text-foreground cursor-pointer !rounded-full border border-transparent px-6 transition-colors hover:bg-transparent"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="yearly"
                className="data-[state=on]:bg-background data-[state=on]:border-border data-[state=on]:text-foreground cursor-pointer !rounded-full border border-transparent px-6 transition-colors hover:bg-transparent"
              >
                Annually
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <p className="text-muted-foreground text-sm">
            <span className="text-primary font-semibold">Save 20%</span> On
            Annual Billing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border">
            <div className="grid lg:grid-cols-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`row-span-4 grid grid-rows-subgrid gap-6 p-8 ${
                    plan.popular
                      ? "bg-card ring-foreground/10 mx-4 my-2 rounded-xl border-transparent shadow-xl ring-1 backdrop-blur"
                      : ""
                  }`}
                >
                  {/* Plan Header */}
                  <div>
                    <div className="mb-2 text-lg font-medium tracking-tight">
                      {plan.name}
                    </div>
                    <div className="text-muted-foreground text-sm text-balance">
                      {plan.description}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="mb-1 text-4xl font-bold">
                      {plan.name === "Lifetime"
                        ? `$${plan.monthlyPrice}`
                        : plan.name === "Free"
                          ? "$0"
                          : `$${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {plan.name === "Lifetime"
                        ? "One-time payment"
                        : "Per month"}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <Button
                      className={`my-2 w-full cursor-pointer ${
                        plan.popular
                          ? "bg-primary ring-primary/15 text-primary-foreground hover:bg-primary/90 border-[0.5px] border-white/25 shadow-md ring-1 shadow-black/20"
                          : "bg-background ring-foreground/10 hover:bg-muted/50 border border-transparent shadow-sm ring-1 shadow-black/15"
                      }`}
                      variant={plan.popular ? "default" : "secondary"}
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  {/* Features */}
                  <div>
                    <ul role="list" className="space-y-3 text-sm">
                      {plan.includesPrevious && (
                        <li className="flex items-center gap-3 font-medium">
                          {plan.includesPrevious}:
                        </li>
                      )}
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <Check
                            className="text-muted-foreground size-4 flex-shrink-0"
                            strokeWidth={2.5}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need custom components or have questions?{" "}
            <Button
              variant="link"
              className="h-auto cursor-pointer p-0"
              asChild
            >
              <a href="#contact">Contact our team</a>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
