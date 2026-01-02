import { Download, FileText, Plus, Settings } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function QuickActions() {
  const tAction = useTranslations("Action")
  const tDashboard = useTranslations("Dashboard")

  return (
    <div className="flex items-center space-x-2">
      <Button className="cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        {tDashboard("newSale")}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            {tAction("actions")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            {tDashboard("generateReport")}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            {tDashboard("exportData")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            {tDashboard("dashboardSettings")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
