"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  sidebarWidth: z.string().optional(),
  contentWidth: z.string().optional(),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export default function AppearanceSettings() {
  const t = useTranslations("Settings.appearance")
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "dark",
      fontFamily: "",
      fontSize: "",
      sidebarWidth: "",
      contentWidth: "",
    },
  })

  function onSubmit(data: AppearanceFormValues) {
    console.log("Form submitted:", data)
    // Here you would typically save the data
  }

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Theme Section */}
          <h3 className="mb-2 text-lg font-medium">{t("theme")}</h3>
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div className="border-muted hover:border-accent rounded-md border-2 p-4 transition-colors">
                          <div className="space-y-2">
                            <div className="h-20 w-20 rounded-md border bg-white p-3">
                              <div className="space-y-2">
                                <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                                <div className="h-2 w-1/2 rounded bg-gray-200"></div>
                                <div className="flex space-x-2">
                                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                  <div className="h-2 flex-1 rounded bg-gray-200"></div>
                                </div>
                                <div className="flex space-x-2">
                                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                                  <div className="h-2 flex-1 rounded bg-gray-200"></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              {t("light")}
                            </span>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div className="border-muted hover:border-accent rounded-md border-2 p-4 transition-colors">
                          <div className="space-y-2">
                            <div className="h-20 w-20 rounded-md border border-gray-700 bg-gray-900 p-3">
                              <div className="space-y-2">
                                <div className="h-2 w-3/4 rounded bg-gray-600"></div>
                                <div className="h-2 w-1/2 rounded bg-gray-600"></div>
                                <div className="flex space-x-2">
                                  <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                                  <div className="h-2 flex-1 rounded bg-gray-600"></div>
                                </div>
                                <div className="flex space-x-2">
                                  <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                                  <div className="h-2 flex-1 rounded bg-gray-600"></div>
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">
                              {t("dark")}
                            </span>
                          </div>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fontFamily"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fontFamily")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder={t("selectFont")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fontSize")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder={t("selectFontSize")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="small">{t("small")}</SelectItem>
                    <SelectItem value="medium">{t("medium")}</SelectItem>
                    <SelectItem value="large">{t("large")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Layout Section */}
          <FormField
            control={form.control}
            name="sidebarWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sidebarWidth")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder={t("selectSidebarWidth")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="compact">{t("compact")}</SelectItem>
                    <SelectItem value="comfortable">
                      {t("comfortable")}
                    </SelectItem>
                    <SelectItem value="spacious">{t("spacious")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contentWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("contentWidth")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder={t("selectContentWidth")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fixed">{t("fixed")}</SelectItem>
                    <SelectItem value="fluid">{t("fluid")}</SelectItem>
                    <SelectItem value="container">{t("container")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-12 flex space-x-2">
            <Button type="submit" className="cursor-pointer">
              {t("save")}
            </Button>
            <Button variant="outline" type="button" className="cursor-pointer">
              {t("cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
