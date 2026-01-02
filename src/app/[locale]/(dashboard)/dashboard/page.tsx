import { useTranslations } from "next-intl"

import { ChartAreaInteractive } from "./components/chart-area-interactive"
import { DataTable } from "./components/data-table"
import { SectionCards } from "./components/section-cards"
import data from "./data/data.json"
import focusDocumentsData from "./data/focus-documents-data.json"
import keyPersonnelData from "./data/key-personnel-data.json"
import pastPerformanceData from "./data/past-performance-data.json"

export default function Page() {
  const t = useTranslations("Dashboard")
  return (
    <>
      {/* Page Title and Description */}
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="@container/main space-y-6 px-4 lg:px-6">
        <SectionCards />
        <ChartAreaInteractive />
      </div>
      <div className="@container/main">
        <DataTable
          data={data}
          pastPerformanceData={pastPerformanceData}
          keyPersonnelData={keyPersonnelData}
          focusDocumentsData={focusDocumentsData}
        />
      </div>
    </>
  )
}
