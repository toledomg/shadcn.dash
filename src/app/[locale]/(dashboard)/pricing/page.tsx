import { useTranslations } from "next-intl"

import { PricingPlans } from "@/components/pricing-plans"

import { FAQSection } from "./components/faq-section"
import { FeaturesGrid } from "./components/features-grid"

export default function PricingPage() {
  const tPricing = useTranslations("Pricing")

  const plans = [
    {
      id: "basic",
      name: tPricing("plans.basic.name"),
      description: tPricing("plans.basic.description"),
      price: "$19",
      frequency: tPricing("month"),
      features: [
        tPricing("plans.basic.features.0"),
        tPricing("plans.basic.features.1"),
        tPricing("plans.basic.features.2"),
        tPricing("plans.basic.features.3"),
      ],
    },
    {
      id: "professional",
      name: tPricing("plans.professional.name"),
      description: tPricing("plans.professional.description"),
      price: "$79",
      frequency: tPricing("month"),
      features: [
        tPricing("plans.professional.features.0"),
        tPricing("plans.professional.features.1"),
        tPricing("plans.professional.features.2"),
        tPricing("plans.professional.features.3"),
        tPricing("plans.professional.features.4"),
        tPricing("plans.professional.features.5"),
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: tPricing("plans.enterprise.name"),
      description: tPricing("plans.enterprise.description"),
      price: "$199",
      frequency: tPricing("month"),
      features: [
        tPricing("plans.enterprise.features.0"),
        tPricing("plans.enterprise.features.1"),
        tPricing("plans.enterprise.features.2"),
        tPricing("plans.enterprise.features.3"),
        tPricing("plans.enterprise.features.4"),
        tPricing("plans.enterprise.features.5"),
      ],
    },
  ]

  const features = [
    {
      id: 1,
      name: tPricing("features.1.name"),
      description: tPricing("features.1.description"),
      icon: "Rocket",
    },
    {
      id: 2,
      name: tPricing("features.2.name"),
      description: tPricing("features.2.description"),
      icon: "Shield",
    },
    {
      id: 3,
      name: tPricing("features.3.name"),
      description: tPricing("features.3.description"),
      icon: "Zap",
    },
    {
      id: 4,
      name: tPricing("features.4.name"),
      description: tPricing("features.4.description"),
      icon: "Users",
    },
    {
      id: 5,
      name: tPricing("features.5.name"),
      description: tPricing("features.5.description"),
      icon: "Headphones",
    },
    {
      id: 6,
      name: tPricing("features.6.name"),
      description: tPricing("features.6.description"),
      icon: "Clock",
    },
  ]

  const faqs = [
    {
      id: 1,
      question: tPricing("faqs.1.question"),
      answer: tPricing("faqs.1.answer"),
    },
    {
      id: 2,
      question: tPricing("faqs.2.question"),
      answer: tPricing("faqs.2.answer"),
    },
    {
      id: 3,
      question: tPricing("faqs.3.question"),
      answer: tPricing("faqs.3.answer"),
    },
    {
      id: 4,
      question: tPricing("faqs.4.question"),
      answer: tPricing("faqs.4.answer"),
    },
    {
      id: 5,
      question: tPricing("faqs.5.question"),
      answer: tPricing("faqs.5.answer"),
    },
    {
      id: 6,
      question: tPricing("faqs.6.question"),
      answer: tPricing("faqs.6.answer"),
    },
  ]

  return (
    <div className="px-4 lg:px-6">
      {/* Pricing Cards */}
      <section className="pb-12" id="pricing">
        <PricingPlans mode="pricing" plans={plans} />
      </section>

      {/* Features Section */}
      <FeaturesGrid features={features} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  )
}
