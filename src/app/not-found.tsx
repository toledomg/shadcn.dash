import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-muted rounded-full p-4">
          <FileQuestion className="text-muted-foreground h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Desculpe, não conseguimos encontrar a página que você está
            procurando.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/">Voltar para o Início</Link>
        </Button>
      </div>
    </div>
  )
}
