"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheckBig,
  Columns2,
  EllipsisVertical,
  GripVertical,
  Loader,
  Plus,
  TrendingUp,
} from "lucide-react"
// ... imports
import { useLocale, useTranslations } from "next-intl"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { schema } from "../schemas/task-schema"

// ... imports

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })
  const tAction = useTranslations("Action")

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 cursor-move hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">{tAction("dragToReorder")}</span>
    </Button>
  )
}

function ActionsCell() {
  const tAction = useTranslations("Action")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
          size="icon"
        >
          <EllipsisVertical />
          <span className="sr-only">{tAction("openMenu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>{tAction("edit")}</DropdownMenuItem>
        <DropdownMenuItem>{tAction("copy")}</DropdownMenuItem>
        <DropdownMenuItem>{tAction("favorite")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          {tAction("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Column definitions are now memoized inside DataTable component

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
  pastPerformanceData = [],
  keyPersonnelData = [],
  focusDocumentsData = [],
}: {
  data: z.infer<typeof schema>[]
  pastPerformanceData?: z.infer<typeof schema>[]
  keyPersonnelData?: z.infer<typeof schema>[]
  focusDocumentsData?: z.infer<typeof schema>[]
}) {
  const tAction = useTranslations("Action")
  const tTable = useTranslations("DataTable")
  const [data, setData] = React.useState(() => initialData)
  const [pastPerformance, setPastPerformance] = React.useState(
    () => pastPerformanceData
  )
  const [keyPersonnel, setKeyPersonnel] = React.useState(() => keyPersonnelData)
  const [focusDocuments, setFocusDocuments] = React.useState(
    () => focusDocumentsData
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const columns = React.useMemo<ColumnDef<z.infer<typeof schema>>[]>(
    () => [
      {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      },
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label={tAction("selectAll")}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label={tAction("selectRow")}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "header",
        header: tTable("header"),
        cell: ({ row }) => {
          return <TableCellViewer item={row.original} />
        },
        enableHiding: false,
      },
      {
        accessorKey: "type",
        header: tTable("sectionType"),
        cell: ({ row }) => (
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {row.original.type}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: tTable("status"),
        cell: ({ row }) => (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.status === "Done" ? (
              <CircleCheckBig className="text-green-500 dark:text-green-400" />
            ) : (
              <Loader />
            )}
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "target",
        header: () => <div className="w-full">{tTable("target")}</div>,
        cell: ({ row }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1000)),
                {
                  loading: `${tAction("saving")} ${row.original.header}`,
                  success: tAction("done"),
                  error: tAction("error"),
                }
              )
            }}
          >
            <Label htmlFor={`${row.original.id}-target`} className="sr-only">
              {tTable("target")}
            </Label>
            <Input
              className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent shadow-none focus-visible:border dark:bg-transparent"
              defaultValue={row.original.target}
              id={`${row.original.id}-target`}
            />
          </form>
        ),
      },
      {
        accessorKey: "limit",
        header: () => <div className="w-full">{tTable("limit")}</div>,
        cell: ({ row }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1000)),
                {
                  loading: `${tAction("saving")} ${row.original.header}`,
                  success: tAction("done"),
                  error: tAction("error"),
                }
              )
            }}
          >
            <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
              {tTable("limit")}
            </Label>
            <Input
              className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent shadow-none focus-visible:border dark:bg-transparent"
              defaultValue={row.original.limit}
              id={`${row.original.id}-limit`}
            />
          </form>
        ),
      },
      {
        accessorKey: "reviewer",
        header: tTable("reviewer"),
        cell: ({ row }) => {
          const isAssigned = row.original.reviewer !== "Assign reviewer"

          if (isAssigned) {
            return row.original.reviewer
          }

          return (
            <>
              <Label
                htmlFor={`${row.original.id}-reviewer`}
                className="sr-only"
              >
                {tTable("reviewer")}
              </Label>
              <Select>
                <SelectTrigger
                  className="w-38 cursor-pointer **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                  size="sm"
                  id={`${row.original.id}-reviewer`}
                >
                  <SelectValue placeholder={tTable("assignReviewer")} />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                </SelectContent>
              </Select>
            </>
          )
        },
      },
      {
        id: "actions",
        cell: () => <ActionsCell />,
      },
    ],
    [tAction, tTable]
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  // Create separate table instances for each tab
  const pastPerformanceIds = React.useMemo<UniqueIdentifier[]>(
    () => pastPerformance?.map(({ id }) => id) || [],
    [pastPerformance]
  )

  const keyPersonnelIds = React.useMemo<UniqueIdentifier[]>(
    () => keyPersonnel?.map(({ id }) => id) || [],
    [keyPersonnel]
  )

  const focusDocumentsIds = React.useMemo<UniqueIdentifier[]>(
    () => focusDocuments?.map(({ id }) => id) || [],
    [focusDocuments]
  )

  const pastPerformanceTable = useReactTable({
    data: pastPerformance,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const keyPersonnelTable = useReactTable({
    data: keyPersonnel,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const focusDocumentsTable = useReactTable({
    data: focusDocuments,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  function handlePastPerformanceDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setPastPerformance((data) => {
        const oldIndex = pastPerformanceIds.indexOf(active.id)
        const newIndex = pastPerformanceIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  function handleKeyPersonnelDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setKeyPersonnel((data) => {
        const oldIndex = keyPersonnelIds.indexOf(active.id)
        const newIndex = keyPersonnelIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  function handleFocusDocumentsDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setFocusDocuments((data) => {
        const oldIndex = focusDocumentsIds.indexOf(active.id)
        const newIndex = focusDocumentsIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  // Component for rendering table content
  const TableContent = ({
    currentTable,
    currentDataIds,
    handleCurrentDragEnd,
  }: {
    currentTable: ReturnType<typeof useReactTable<z.infer<typeof schema>>>
    currentDataIds: UniqueIdentifier[]
    handleCurrentDragEnd: (event: DragEndEvent) => void
  }) => (
    <>
      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleCurrentDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {currentTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {currentTable.getRowModel().rows?.length ? (
                <SortableContext
                  items={currentDataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {currentTable.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {tAction("noResults")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {tTable("rowsSelected", {
            count: currentTable.getFilteredSelectedRowModel().rows.length,
            total: currentTable.getFilteredRowModel().rows.length,
          })}
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              {tAction("rowsPerPage")}
            </Label>
            <Select
              value={`${currentTable.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                currentTable.setPageSize(Number(value))
              }}
            >
              <SelectTrigger
                size="sm"
                className="w-20 cursor-pointer"
                id="rows-per-page"
              >
                <SelectValue
                  placeholder={currentTable.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            {tAction("pageOf", {
              current: currentTable.getState().pagination.pageIndex + 1,
              total: currentTable.getPageCount(),
            })}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
              onClick={() => currentTable.setPageIndex(0)}
              disabled={!currentTable.getCanPreviousPage()}
            >
              <span className="sr-only">{tAction("firstPage")}</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size="icon"
              onClick={() => currentTable.previousPage()}
              disabled={!currentTable.getCanPreviousPage()}
            >
              <span className="sr-only">{tAction("previousPage")}</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size="icon"
              onClick={() => currentTable.nextPage()}
              disabled={!currentTable.getCanNextPage()}
            >
              <span className="sr-only">{tAction("nextPage")}</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 cursor-pointer lg:flex"
              size="icon"
              onClick={() =>
                currentTable.setPageIndex(currentTable.getPageCount() - 1)
              }
              disabled={!currentTable.getCanNextPage()}
            >
              <span className="sr-only">{tAction("lastPage")}</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          {tAction("view")}
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit cursor-pointer sm:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder={tAction("selectView")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">{tTable("outline")}</SelectItem>
            <SelectItem value="past-performance">
              {tTable("pastPerformance")}
            </SelectItem>
            <SelectItem value="key-personnel">
              {tTable("keyPersonnel")}
            </SelectItem>
            <SelectItem value="focus-documents">
              {tTable("focusDocuments")}
            </SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 sm:flex">
          <TabsTrigger value="outline" className="cursor-pointer">
            {tTable("outline")}
          </TabsTrigger>
          <TabsTrigger value="past-performance" className="cursor-pointer">
            {tTable("pastPerformance")} <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel" className="cursor-pointer">
            {tTable("keyPersonnel")} <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents" className="cursor-pointer">
            {tTable("focusDocuments")}
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Columns2 />
                <span className="hidden lg:inline">
                  {tAction("customizeColumns")}
                </span>
                <span className="lg:hidden">{tAction("columns")}</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <Plus />
            <span className="hidden lg:inline">{tAction("addSection")}</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {tAction("noResults")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {tTable("rowsSelected", {
              count: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                {tAction("rowsPerPage")}
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger
                  size="sm"
                  className="w-20 cursor-pointer"
                  id="rows-per-page"
                >
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              {tAction("pageOf", {
                current: table.getState().pagination.pageIndex + 1,
                total: table.getPageCount(),
              })}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">{tAction("firstPage")}</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8 cursor-pointer"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">{tAction("previousPage")}</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8 cursor-pointer"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">{tAction("nextPage")}</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 cursor-pointer lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">{tAction("lastPage")}</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <TableContent
          currentTable={pastPerformanceTable}
          currentDataIds={pastPerformanceIds}
          handleCurrentDragEnd={handlePastPerformanceDragEnd}
        />
      </TabsContent>
      <TabsContent
        value="key-personnel"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <TableContent
          currentTable={keyPersonnelTable}
          currentDataIds={keyPersonnelIds}
          handleCurrentDragEnd={handleKeyPersonnelDragEnd}
        />
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <TableContent
          currentTable={focusDocumentsTable}
          currentDataIds={focusDocumentsIds}
          handleCurrentDragEnd={handleFocusDocumentsDragEnd}
        />
      </TabsContent>
    </Tabs>
  )
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()
  const tDataTable = useTranslations("DataTable")
  const tAction = useTranslations("Action")
  const locale = useLocale()

  const chartData = React.useMemo(() => {
    const today = new Date()
    return [0, 1, 2, 3, 4, 5].map((offset) => {
      const date = new Date(today.getFullYear(), offset, 1)
      const monthName = new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(date)
      // Capitalize first letter
      return {
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        desktop: Math.floor(Math.random() * 300) + 50, // simulating dynamic data
        mobile: Math.floor(Math.random() * 200) + 50,
      }
    })
  }, [locale])

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit cursor-pointer px-0 text-left"
        >
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>{tDataTable("visitorsStats")}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  {tDataTable("trendingUp", { percent: 5.2 })}{" "}
                  <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  {tDataTable("description")}
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">{tDataTable("header")}</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">{tDataTable("sectionType")}</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full cursor-pointer">
                    <SelectValue placeholder={tDataTable("typePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      {tDataTable("tableOfContents")}
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      {tDataTable("executiveSummary")}
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      {tDataTable("technicalApproach")}
                    </SelectItem>
                    <SelectItem value="Design">
                      {tDataTable("design")}
                    </SelectItem>
                    <SelectItem value="Capabilities">
                      {tDataTable("capabilities")}
                    </SelectItem>
                    <SelectItem value="Focus Documents">
                      {tDataTable("focusDocuments")}
                    </SelectItem>
                    <SelectItem value="Narrative">
                      {tDataTable("narrative")}
                    </SelectItem>
                    <SelectItem value="Cover Page">
                      {tDataTable("coverPage")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">{tDataTable("status")}</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full cursor-pointer">
                    <SelectValue
                      placeholder={tDataTable("statusPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">
                      {tDataTable("statusDone")}
                    </SelectItem>
                    <SelectItem value="In Progress">
                      {tDataTable("statusInProgress")}
                    </SelectItem>
                    <SelectItem value="Not Started">
                      {tDataTable("statusNotStarted")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">{tDataTable("target")}</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">{tDataTable("limit")}</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">{tDataTable("reviewer")}</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full cursor-pointer">
                  <SelectValue
                    placeholder={tDataTable("reviewerPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button className="cursor-pointer">{tAction("submit")}</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              {tAction("done")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
