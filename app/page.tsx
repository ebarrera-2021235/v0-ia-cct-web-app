import { Header } from "@/components/header"
import { RepoAnalyzer } from "@/components/repo-analyzer"
import { CodeDebugger } from "@/components/code-debugger"
import { AIChat } from "@/components/ai-chat"
import { Bot, Zap, Shield, Code2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Potenciado por IA</span>
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Analiza y mejora tu código con
            <span className="text-primary"> Inteligencia Artificial</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground sm:text-lg">
            IA-CCT te ayuda a detectar errores, analizar repositorios de GitHub y obtener 
            sugerencias inteligentes para mejorar la calidad de tu código.
          </p>

          {/* Features */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Análisis Rápido</h3>
              <p className="text-sm text-muted-foreground">
                Obtén resultados en segundos con nuestro motor de análisis optimizado
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Detección de Errores</h3>
              <p className="text-sm text-muted-foreground">
                Identifica vulnerabilidades y bugs antes de que lleguen a producción
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">Código Corregido</h3>
              <p className="text-sm text-muted-foreground">
                Recibe sugerencias de código corregido listo para usar
              </p>
            </div>
          </div>
        </section>

        {/* Main Tools */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <RepoAnalyzer />
            <AIChat />
          </div>
          <div>
            <CodeDebugger />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">IA-CCT</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Herramienta de análisis de código con Inteligencia Artificial para desarrolladores
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © 2026 IA-CCT. Todos los derechos reservados.
          </p>
        </footer>
      </main>
    </div>
  )
}
