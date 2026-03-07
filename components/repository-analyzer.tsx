"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GitBranch, Loader2, FolderGit2, Search } from "lucide-react"
import { AnalysisResults } from "./analysis-results"

export interface AnalysisResult {
  summary: string
  technologies: string[]
  issues: { type: "error" | "warning" | "info"; message: string; details: string }[]
  recommendations: string[]
}

export function RepositoryAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return

    setIsAnalyzing(true)
    setResults(null)

    await new Promise((resolve) => setTimeout(resolve, 2500))

    setResults({
      summary: "Proyecto Next.js 14 con TypeScript y Tailwind CSS. Estructura bien organizada con 45 archivos y 12 componentes reutilizables.",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "React 18", "Prisma", "PostgreSQL"],
      issues: [
        {
          type: "error",
          message: "Vulnerabilidad crítica en dependencia",
          details: "lodash@4.17.19 tiene una vulnerabilidad de prototype pollution. Actualizar a 4.17.21+",
        },
        {
          type: "warning",
          message: "Dependencias desactualizadas",
          details: "3 paquetes requieren actualización: react-dom, next, eslint",
        },
        {
          type: "info",
          message: "Archivos sin usar detectados",
          details: "Se encontraron 2 componentes que no se importan en ningún lugar del proyecto",
        },
      ],
      recommendations: [
        "Implementar tests unitarios - Cobertura actual: 0%",
        "Agregar documentación README más detallada",
        "Configurar ESLint con reglas más estrictas",
        "Considerar migrar a Biome para mejor rendimiento",
      ],
    })

    setIsAnalyzing(false)
  }

  return (
    <motion.section 
      id="analizador" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border bg-card/80 pb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <FolderGit2 className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-semibold text-card-foreground">
                Analizador de Repositorios
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Analiza tu repositorio de GitHub y detecta problemas automáticamente
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <GitBranch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="https://github.com/usuario/repositorio"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="h-12 bg-input pl-12 text-base text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !repoUrl.trim()} 
                className="h-12 gap-2 bg-gradient-to-r from-primary to-primary/80 px-6 text-base font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Analizar Proyecto
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {results && <AnalysisResults results={results} />}
          </AnimatePresence>

          {!isAnalyzing && !results && (
            <motion.div 
              className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FolderGit2 className="mx-auto h-14 w-14 text-muted-foreground/40" />
              <p className="mt-5 text-muted-foreground">
                Ingresa la URL de un repositorio de GitHub para comenzar el análisis
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  )
}
