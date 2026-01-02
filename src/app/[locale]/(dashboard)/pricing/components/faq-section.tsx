import { useTranslations } from "next-intl"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FAQ {
  id: number
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const t = useTranslations("Pricing")
  return (
    <Card className="mt-6 sm:mt-8 lg:mt-12">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {t("frequentlyAskedQuestions")}
        </CardTitle>
        <CardDescription>{t("faqDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="mt-6 sm:mt-8">
        <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <Accordion type="multiple">
              {faqs.slice(0, 3).map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="my-3 rounded-md border!"
                >
                  <AccordionTrigger className="cursor-pointer px-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Accordion type="multiple">
              {faqs.slice(3, 6).map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`item-${item.id}`}
                  className="my-3 rounded-md border!"
                >
                  <AccordionTrigger className="cursor-pointer px-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
