"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { z } from "zod"

import { getColumns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { taskSchema, type Task } from "./data/schema"
import tasksData from "./data/tasks.json"

// Use static import for tasks data (works in both Vite and Next.js)
async function getTasks() {
  return z.array(taskSchema).parse(tasksData)
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations("Tasks")

  const columns = getColumns(t)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskList = await getTasks()
        setTasks(taskList)
      } catch (error) {
        console.error("Failed to load tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev])
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-muted-foreground">{t("loading")}</div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile view placeholder - shows message instead of images */}
      <div className="md:hidden">
        <div className="bg-muted/20 flex h-96 items-center justify-center rounded-lg border">
          <div className="p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">{t("heading")}</h3>
            <p className="text-muted-foreground">{t("mobilePlaceholder")}</p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden h-full flex-1 flex-col px-4 md:flex md:px-6">
        <DataTable data={tasks} columns={columns} onAddTask={handleAddTask} />
      </div>
    </>
  )
}
