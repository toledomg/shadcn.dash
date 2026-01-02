"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ArrowRight, Play, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/dot-pattern"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="from-background to-background/80 relative overflow-hidden bg-gradient-to-b pt-20 pb-16 sm:pt-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay using reusable component */}
        <DotPattern className="opacity-100" size="md" fadeStyle="ellipse" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="outline" className="border-foreground px-4 py-2">
              <Star className="mr-2 h-3 w-3 fill-current" />
              New: Premium Template Collection
              <ArrowRight className="ml-2 h-3 w-3" />
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Build Better
            <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
              {" "}
              Web Applications{" "}
            </span>
            with Ready-Made Components
          </h1>

          {/* Subheading */}
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
            Accelerate your development with our curated collection of blocks,
            templates, landing pages, and admin dashboards. From free components
            to complete solutions, built with shadcn/ui.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="cursor-pointer text-base" asChild>
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer text-base"
              asChild
            >
              <a href="#">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="group relative">
            {/* Top background glow effect - positioned above the image */}
            <div className="bg-primary/50 absolute top-2 left-1/2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full blur-3xl lg:-top-8 lg:h-80"></div>

            <div className="bg-card relative rounded-xl border shadow-2xl">
              {/* Light mode dashboard image */}
              <Image
                src="/dashboard-light.png"
                alt="Dashboard Preview - Light Mode"
                width={1200}
                height={800}
                className="block w-full rounded-xl object-cover dark:hidden"
                priority
              />

              {/* Dark mode dashboard image */}
              <Image
                src="/dashboard-dark.png"
                alt="Dashboard Preview - Dark Mode"
                width={1200}
                height={800}
                className="hidden w-full rounded-xl object-cover dark:block"
                priority
              />

              {/* Bottom fade effect - gradient overlay that fades the image to background */}
              <div className="from-background/0 via-background/70 to-background absolute bottom-0 left-0 h-32 w-full rounded-b-xl bg-gradient-to-b md:h-40 lg:h-48"></div>

              {/* Overlay play button for demo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="h-16 w-16 cursor-pointer rounded-full p-0 transition-transform hover:scale-105"
                  asChild
                >
                  <a href="#" aria-label="Watch demo video">
                    <Play className="h-6 w-6 fill-current" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
