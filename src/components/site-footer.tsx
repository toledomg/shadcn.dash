import Link from "next/link"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export function SiteFooter() {
  const t = useTranslations("Footer")
  return (
    <footer className="bg-background border-t">
      <div className="px-4 py-6 lg:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="text-muted-foreground flex items-center space-x-2 text-sm">
            <span>{t("modified")}</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>{t("by")}</span>
            <Link
              href="https://github.com/toledomg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Alexsandro Tolêdo
            </Link>
          </div>
          <p className="text-muted-foreground text-xs">{t("description")}</p>
        </div>
      </div>
    </footer>
  )
}
