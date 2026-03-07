"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
          message: "Vulnerabilidad critica en dependencia",
          details: "lodash@4.17.19 tiene una vulnerabilidad de prototype pollution. Actualizar a 4.17.21+",
        },
        {
          type: "warning",
          message: "Dependencias desactualizadas",
          details: "3 paquetes requieren actualizacion: react-dom, next, eslint",
        },
        {
          type: "info",
          message: "Archivos sin usar detectados",
          details: "Se encontraron 2 componentes que no se importan en ningun lugar del proyecto",
        },
      ],
      recommendations: [
        "Implementar tests unitarios - Cobertura actual: 0%",
        "Agregar documentacion README mas detallada",
        "Configurar ESLint con reglas mas estrictas",
        "Considerar migrar a Biome para mejor rendimiento",
      ],
    })

    setIsAnalyzing(false)
  }

  return (
    <section id="analizador" className="scroll-mt-24">
      <Card className="overflow-hidden border-orange-500/10 bg-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-orange-500/10 bg-card/50 p-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: [
                  "0 0 15px rgba(249, 115, 22, 0.1)",
                  "0 0 25px rgba(249, 115, 22, 0.2)",
                  "0 0 15px rgba(249, 115, 22, 0.1)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <FolderGit2 className="h-7 w-7 text-orange-500" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                <span className="text-gradient">Analizador</span> de Repositorios
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Analiza tu repositorio de GitHub y detecta problemas automaticamente
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
                className="h-14 border-orange-500/20 bg-background pl-12 text-base text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !repoUrl.trim()} 
                className="h-14 gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 disabled:opacity-50"
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
              className="rounded-2xl border border-dashed border-orange-500/20 bg-orange-500/5 p-16 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FolderGit2 className="mx-auto h-20 w-20 text-orange-500/20" />
              </motion.div>
              <p className="mt-6 text-lg text-muted-foreground">
                Ingresa la URL de un repositorio de GitHub para comenzar
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
