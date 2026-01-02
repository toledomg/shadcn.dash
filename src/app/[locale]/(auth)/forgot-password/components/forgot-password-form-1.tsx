"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ... imports

export function ForgotPasswordForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const tAuth = useTranslations("Auth")
  const tAction = useTranslations("Action")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {tAuth("forgotPasswordTitle")}
          </CardTitle>
          <CardDescription>{tAuth("forgotPasswordSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">{tAuth("emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  {tAction("sendResetLink")}
                </Button>
              </div>
              <div className="text-center text-sm">
                {tAuth("rememberPassword")}{" "}
                <Link
                  href="/auth/sign-in"
                  className="underline underline-offset-4"
                >
                  {tAction("backToSignIn")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
