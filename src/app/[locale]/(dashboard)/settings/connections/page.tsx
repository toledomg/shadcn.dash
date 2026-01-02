"use client"

import { useState } from "react"
import {
  Apple,
  Chrome,
  Database,
  Dribbble,
  Facebook,
  Github,
  Globe,
  Instagram,
  Slack,
  Twitter,
  Zap,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function ConnectionSettings() {
  const t = useTranslations("Settings.connections")
  // Controlled state for switches
  const [appleConnected, setAppleConnected] = useState(true)
  const [googleConnected, setGoogleConnected] = useState(false)
  const [githubConnected, setGithubConnected] = useState(true)
  const [slackConnected, setSlackConnected] = useState(false)
  const [zapierConnected, setZapierConnected] = useState(true)
  const [webhooksConnected, setWebhooksConnected] = useState(false)
  const [dbConnected, setDbConnected] = useState(true)

  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("connectedAccounts")}</CardTitle>
            <CardDescription>{t("connectedAccountsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Apple className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Apple</div>
                    <div className="text-muted-foreground text-sm">
                      {t("appleDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={appleConnected}
                  onCheckedChange={setAppleConnected}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Chrome className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Google</div>
                    <div className="text-muted-foreground text-sm">
                      {t("googleDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={googleConnected}
                  onCheckedChange={setGoogleConnected}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Github className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Github</div>
                    <div className="text-muted-foreground text-sm">
                      {t("githubDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={githubConnected}
                  onCheckedChange={setGithubConnected}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Slack className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Slack</div>
                    <div className="text-muted-foreground text-sm">
                      {t("slackDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={slackConnected}
                  onCheckedChange={setSlackConnected}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("socialAccounts")}</CardTitle>
            <CardDescription>{t("connectedAccountsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Facebook className="h-8 w-8" />
                  <div>
                    <div className="font-medium">
                      Facebook
                      <Badge variant="outline" className="ml-2">
                        {t("notConnected")}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {t("facebookDesc")}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Twitter className="h-8 w-8" />
                  <div>
                    <div className="font-medium">
                      Twitter
                      <Badge variant="secondary" className="ml-2">
                        {t("connected")}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {t("twitterDesc")}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-8 w-8" />
                  <div>
                    <div className="font-medium">
                      Instagram
                      <Badge variant="secondary" className="ml-2">
                        {t("connected")}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {t("instagramDesc")}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Dribbble className="h-8 w-8" />
                  <div>
                    <div className="font-medium">
                      Dribbble
                      <Badge variant="outline" className="ml-2">
                        {t("notConnected")}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {t("dribbbleDesc")}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("apiIntegrations")}</CardTitle>
            <CardDescription>{t("apiIntegrationsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Zapier</div>
                    <div className="text-muted-foreground text-sm">
                      {t("zapierDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={zapierConnected}
                  onCheckedChange={setZapierConnected}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Webhooks</div>
                    <div className="text-muted-foreground text-sm">
                      {t("webhooksDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={webhooksConnected}
                  onCheckedChange={setWebhooksConnected}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Database Sync</div>
                    <div className="text-muted-foreground text-sm">
                      {t("dbSyncDesc")}
                    </div>
                  </div>
                </div>
                <Switch
                  className="cursor-pointer"
                  checked={dbConnected}
                  onCheckedChange={setDbConnected}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("apiKeys")}</CardTitle>
            <CardDescription>{t("apiKeysDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{t("productionKey")}</div>
                  <div className="text-muted-foreground font-mono text-sm">
                    sk_live_••••••••••••••••••••••••4234
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    {t("regenerate")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    {t("copy")}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{t("developmentKey")}</div>
                  <div className="text-muted-foreground font-mono text-sm">
                    sk_test_••••••••••••••••••••••••5678
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    {t("regenerate")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    {t("copy")}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="pt-4">
                <Button variant="outline" className="cursor-pointer">
                  {t("addNewKey")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
