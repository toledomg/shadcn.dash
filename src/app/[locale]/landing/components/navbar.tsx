"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import {
  ChevronDown,
  Github,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react"

import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MegaMenu } from "@/components/landing/mega-menu"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

const navigationItems = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#features", hasMegaMenu: true },
  { name: "Team", href: "#team" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
]

// Solutions menu items for mobile
const solutionsItems = [
  { title: "Browse Products" },
  { name: "Free Blocks", href: "#free-blocks" },
  { name: "Premium Templates", href: "#premium-templates" },
  { name: "Admin Dashboards", href: "#admin-dashboards" },
  { name: "Landing Pages", href: "#landing-pages" },
  { title: "Categories" },
  { name: "E-commerce", href: "#ecommerce" },
  { name: "SaaS Dashboards", href: "#saas-dashboards" },
  { name: "Analytics", href: "#analytics" },
  { name: "Authentication", href: "#authentication" },
  { title: "Resources" },
  { name: "Documentation", href: "#docs" },
  { name: "Component Showcase", href: "#showcase" },
  { name: "GitHub Repository", href: "#github" },
  { name: "Design System", href: "#design-system" },
]

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith("#")) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
}

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            href="https://shadcnstore.com"
            className="flex cursor-pointer items-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo size={32} />
            <span className="font-bold">ShadcnStore</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.hasMegaMenu ? (
                  <>
                    <NavigationMenuTrigger className="hover:text-primary focus:text-primary cursor-pointer bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MegaMenu />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    className="group hover:text-primary focus:text-primary inline-flex h-10 w-max cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      if (item.href.startsWith("#")) {
                        smoothScrollTo(item.href)
                      } else {
                        window.location.href = item.href
                      }
                    }}
                  >
                    {item.name}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden items-center space-x-2 xl:flex">
          <ModeToggle variant="ghost" />
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="cursor-pointer"
          >
            <a
              href="https://github.com/toledomg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" asChild className="cursor-pointer">
            <Link href="/dashboard" target="_blank" rel="noopener noreferrer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" asChild className="cursor-pointer">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild className="cursor-pointer">
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:w-[400px] [&>button]:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <SheetHeader className="space-y-0 border-b p-4 pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <Logo size={16} />
                  </div>
                  <SheetTitle className="text-lg font-semibold">
                    ShadcnStore
                  </SheetTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                      className="h-8 w-8 cursor-pointer"
                    >
                      <Moon className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Sun className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 cursor-pointer"
                    >
                      <a
                        href="https://github.com/toledomg"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <nav className="space-y-1 p-6">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.hasMegaMenu ? (
                        <Collapsible
                          open={solutionsOpen}
                          onOpenChange={setSolutionsOpen}
                        >
                          <CollapsibleTrigger className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors">
                            {item.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-1 pl-4">
                            {solutionsItems.map((solution, index) =>
                              solution.title ? (
                                <div
                                  key={`title-${index}`}
                                  className="text-muted-foreground/50 mt-5 px-4 py-2 text-xs font-semibold tracking-wider uppercase"
                                >
                                  {solution.title}
                                </div>
                              ) : (
                                <a
                                  key={solution.name}
                                  href={solution.href}
                                  className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm transition-colors"
                                  onClick={(e) => {
                                    setIsOpen(false)
                                    if (solution.href?.startsWith("#")) {
                                      e.preventDefault()
                                      setTimeout(
                                        () => smoothScrollTo(solution.href),
                                        100
                                      )
                                    }
                                  }}
                                >
                                  {solution.name}
                                </a>
                              )
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a
                          href={item.href}
                          className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded-lg px-4 py-3 text-base font-medium transition-colors"
                          onClick={(e) => {
                            setIsOpen(false)
                            if (item.href.startsWith("#")) {
                              e.preventDefault()
                              setTimeout(() => smoothScrollTo(item.href), 100)
                            }
                          }}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="space-y-4 border-t p-6">
                {/* Primary Actions */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full cursor-pointer"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="cursor-pointer"
                    >
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild size="lg" className="cursor-pointer">
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
