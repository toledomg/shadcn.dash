"use client"

import React from "react"
import {
  Dices,
  ExternalLink,
  Moon,
  Palette,
  RotateCcw,
  Settings,
  Sun,
  Upload,
  X,
} from "lucide-react"

import type { ImportedTheme } from "@/types/theme-customizer"
import { baseColors, radiusOptions } from "@/config/theme-customizer-constants"
import { colorThemes, tweakcnThemes } from "@/config/theme-data"
import { cn } from "@/lib/utils"
import { useCircularTransition } from "@/hooks/use-circular-transition"
import { useThemeManager } from "@/hooks/use-theme-manager"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ColorPicker } from "@/components/color-picker"
import { ImportModal } from "@/components/theme-customizer/import-modal"

import "@/components/theme-customizer/circular-transition.css"

interface LandingThemeCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LandingThemeCustomizer({
  open,
  onOpenChange,
}: LandingThemeCustomizerProps) {
  const {
    applyImportedTheme,
    isDarkMode,
    resetTheme,
    applyRadius,
    setBrandColorsValues,
    applyTheme,
    applyTweakcnTheme,
    brandColorsValues,
    handleColorChange,
  } = useThemeManager()

  const { toggleTheme } = useCircularTransition()

  const [selectedTheme, setSelectedTheme] = React.useState("default")
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = React.useState("")
  const [selectedRadius, setSelectedRadius] = React.useState("0.5rem")
  const [importModalOpen, setImportModalOpen] = React.useState(false)
  const [importedTheme, setImportedTheme] =
    React.useState<ImportedTheme | null>(null)

  const handleReset = () => {
    // Reset all state variables to initial values
    setSelectedTheme("")
    setSelectedTweakcnTheme("")
    setSelectedRadius("0.5rem")
    setImportedTheme(null)
    setBrandColorsValues({})

    // Reset theme and radius to defaults
    resetTheme()
    applyRadius("0.5rem")
  }

  const handleImport = (themeData: ImportedTheme) => {
    setImportedTheme(themeData)
    // Clear other selections to indicate custom import is active
    setSelectedTheme("")
    setSelectedTweakcnTheme("")

    // Apply the imported theme
    applyImportedTheme(themeData, isDarkMode)
  }

  const handleImportClick = () => {
    setImportModalOpen(true)
  }

  const handleRandomShadcn = () => {
    // Apply a random shadcn theme
    const randomTheme =
      colorThemes[Math.floor(Math.random() * colorThemes.length)]
    setSelectedTheme(randomTheme.value)
    setSelectedTweakcnTheme("")
    setBrandColorsValues({})
    setImportedTheme(null)
    applyTheme(randomTheme.value, isDarkMode)
  }

  const handleRandomTweakcn = () => {
    // Apply a random tweakcn theme
    const randomTheme =
      tweakcnThemes[Math.floor(Math.random() * tweakcnThemes.length)]
    setSelectedTweakcnTheme(randomTheme.value)
    setSelectedTheme("")
    setBrandColorsValues({})
    setImportedTheme(null)
    applyTweakcnTheme(randomTheme.preset, isDarkMode)
  }

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius)
    applyRadius(radius)
  }

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === false) return
    toggleTheme(event)
  }

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === true) return
    toggleTheme(event)
  }

  // Re-apply themes when theme mode changes
  React.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode)
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode)
    } else if (selectedTweakcnTheme) {
      const selectedPreset = tweakcnThemes.find(
        (t) => t.value === selectedTweakcnTheme
      )?.preset
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset, isDarkMode)
      }
    }
  }, [
    isDarkMode,
    importedTheme,
    selectedTheme,
    selectedTweakcnTheme,
    applyImportedTheme,
    applyTheme,
    applyTweakcnTheme,
  ])

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent
          side="right"
          className="pointer-events-auto flex w-[400px] flex-col gap-0 overflow-hidden p-0 [&>button]:hidden"
          onInteractOutside={(e) => {
            // Prevent the sheet from closing when dialog is open
            if (importModalOpen) {
              e.preventDefault()
            }
          }}
        >
          <SheetHeader className="space-y-0 p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-2">
                <Settings className="h-4 w-4" />
              </div>
              <SheetTitle className="text-lg font-semibold">
                Theme Customizer
              </SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="h-8 w-8 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <SheetDescription className="text-muted-foreground text-sm">
              Customize the theme and colors of your landing page.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {/* Mode Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={!isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleLightMode}
                  className="mode-toggle-button relative cursor-pointer overflow-hidden"
                >
                  <Sun className="mr-1 h-4 w-4 transition-transform duration-300" />
                  Light
                </Button>
                <Button
                  variant={isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleDarkMode}
                  className="mode-toggle-button relative cursor-pointer overflow-hidden"
                >
                  <Moon className="mr-1 h-4 w-4 transition-transform duration-300" />
                  Dark
                </Button>
              </div>
            </div>

            <Separator />

            {/* Shadcn UI Theme Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Shadcn UI Theme Presets
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRandomShadcn}
                  className="cursor-pointer"
                >
                  <Dices className="mr-1.5 h-3.5 w-3.5" />
                  Random
                </Button>
              </div>

              <Select
                value={selectedTheme}
                onValueChange={(value) => {
                  setSelectedTheme(value)
                  setSelectedTweakcnTheme("")
                  setBrandColorsValues({})
                  setImportedTheme(null)
                  applyTheme(value, isDarkMode)
                }}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Shadcn Theme" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="p-2">
                    {colorThemes.map((theme) => (
                      <SelectItem
                        key={theme.value}
                        value={theme.value}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.primary,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.secondary,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.accent,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.muted,
                              }}
                            />
                          </div>
                          <span>{theme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Tweakcn Theme Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Tweakcn Theme Presets
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRandomTweakcn}
                  className="cursor-pointer"
                >
                  <Dices className="mr-1.5 h-3.5 w-3.5" />
                  Random
                </Button>
              </div>

              <Select
                value={selectedTweakcnTheme}
                onValueChange={(value) => {
                  setSelectedTweakcnTheme(value)
                  setSelectedTheme("")
                  setBrandColorsValues({})
                  setImportedTheme(null)
                  const selectedPreset = tweakcnThemes.find(
                    (t) => t.value === value
                  )?.preset
                  if (selectedPreset) {
                    applyTweakcnTheme(selectedPreset, isDarkMode)
                  }
                }}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Tweakcn Theme" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="p-2">
                    {tweakcnThemes.map((theme) => (
                      <SelectItem
                        key={theme.value}
                        value={theme.value}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.primary,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.secondary,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.accent,
                              }}
                            />
                            <div
                              className="border-border/20 h-3 w-3 rounded-full border"
                              style={{
                                backgroundColor:
                                  theme.preset.styles.light.muted,
                              }}
                            />
                          </div>
                          <span>{theme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Radius Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Radius</Label>
              <div className="grid grid-cols-5 gap-2">
                {radiusOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`relative cursor-pointer rounded-md border p-3 transition-colors ${
                      selectedRadius === option.value
                        ? "border-primary"
                        : "border-border hover:border-border/60"
                    }`}
                    onClick={() => handleRadiusSelect(option.value)}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium">{option.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Import Theme Button */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handleImportClick}
                className="w-full cursor-pointer"
              >
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Import Theme
              </Button>
            </div>

            {/* Brand Colors Section */}
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-lg border-b"
            >
              <AccordionItem
                value="brand-colors"
                className="border-border overflow-hidden rounded-lg border"
              >
                <AccordionTrigger className="hover:bg-muted/50 px-4 py-3 transition-colors hover:no-underline">
                  <Label className="cursor-pointer text-sm font-medium">
                    Brand Colors
                  </Label>
                </AccordionTrigger>
                <AccordionContent className="border-border bg-muted/20 space-y-3 border-t px-4 pt-2 pb-4">
                  {baseColors.map((color) => (
                    <div
                      key={color.cssVar}
                      className="flex items-center justify-between"
                    >
                      <ColorPicker
                        label={color.name}
                        cssVar={color.cssVar}
                        value={brandColorsValues[color.cssVar] || ""}
                        onChange={handleColorChange}
                      />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Tweakcn */}
            <div className="bg-muted space-y-3 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Palette className="text-primary h-4 w-4" />
                <span className="text-sm font-medium">
                  Advanced Customization
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                For advanced theme customization with real-time preview, visual
                color picker, and hundreds of prebuilt themes, visit{" "}
                <a
                  href="https://tweakcn.com/editor/theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary cursor-pointer font-medium hover:underline"
                >
                  tweakcn.com
                </a>
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full cursor-pointer"
                onClick={() =>
                  window.open("https://tweakcn.com/editor/theme", "_blank")
                }
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Open Tweakcn
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImport}
      />
    </>
  )
}

// Floating trigger button for landing page
export function LandingThemeCustomizerTrigger({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "bg-primary hover:bg-primary/90 text-primary-foreground fixed top-1/2 right-4 z-50 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full shadow-lg"
      )}
    >
      <Settings className="h-5 w-5" />
    </Button>
  )
}
