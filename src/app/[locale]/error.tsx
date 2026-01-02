"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertTriangle className="text-destructive h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Algo deu errado
          </h1>
          <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Encontramos um erro inesperado. Tente recarregar a página ou volte
            mais tarde.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => reset()} variant="default" size="lg">
            Tentar Novamente
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
