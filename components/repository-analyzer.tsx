"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  GitBranch, 
  Loader2, 
  FolderGit2, 
  Search, 
  Star, 
  GitFork, 
  Eye, 
  Calendar,
  User,
  FileCode,
  History,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react"
import { AnalysisResults } from "./analysis-results"

export interface RepoInfo {
  name: string
  owner: string
  description: string
  stars: number
  forks: number
  watchers: number
  language: string
  lastUpdate: string
  createdAt: string
  openIssues: number
  license: string
  size: number
  defaultBranch: string
}

export interface AnalysisResult {
  summary: string
  technologies: string[]
  issues: { type: "error" | "warning" | "info"; message: string; details: string }[]
  recommendations: string[]
  codeQuality: number
  securityScore: number
  performanceScore: number
  maintainabilityScore: number
}

export function RepositoryAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null)
  const [recentRepos, setRecentRepos] = useState<string[]>([
    "vercel/next.js",
    "facebook/react",
    "tailwindlabs/tailwindcss"
  ])

  const analysisSteps = [
    { label: "Clonando repositorio...", icon: GitBranch },
    { label: "Analizando estructura...", icon: FolderGit2 },
    { label: "Escaneando dependencias...", icon: FileCode },
    { label: "Detectando vulnerabilidades...", icon: Shield },
    { label: "Evaluando calidad del codigo...", icon: TrendingUp },
    { label: "Generando reporte...", icon: Zap },
  ]

  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/\s]+)/,
      /^([^\/]+)\/([^\/\s]+)$/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return { owner: match[1], repo: match[2].replace(/\.git$/, "") }
      }
    }
    return null
  }

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return

    const parsed = parseGitHubUrl(repoUrl)
    if (!parsed) return

    setIsAnalyzing(true)
    setResults(null)
    setRepoInfo(null)
    setAnalysisStep(0)

    // Simular pasos del analisis
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i)
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    // Simular info del repositorio
    setRepoInfo({
      name: parsed.repo,
      owner: parsed.owner,
      description: "Un proyecto increible construido con tecnologias modernas para el desarrollo web",
      stars: Math.floor(Math.random() * 50000) + 100,
      forks: Math.floor(Math.random() * 5000) + 50,
      watchers: Math.floor(Math.random() * 1000) + 20,
      language: ["TypeScript", "JavaScript", "Python", "Go", "Rust"][Math.floor(Math.random() * 5)],
      lastUpdate: "hace 2 dias",
      createdAt: "2023",
      openIssues: Math.floor(Math.random() * 100),
      license: "MIT",
      size: Math.floor(Math.random() * 10000) + 500,
      defaultBranch: "main"
    })

    // Agregar a repos recientes
    const fullRepo = `${parsed.owner}/${parsed.repo}`
    if (!recentRepos.includes(fullRepo)) {
      setRecentRepos(prev => [fullRepo, ...prev.slice(0, 2)])
    }

    setResults({
      summary: `Proyecto ${parsed.repo} de ${parsed.owner}. Arquitectura moderna con patrones de diseno bien implementados. Estructura de carpetas organizada con ${Math.floor(Math.random() * 100) + 20} archivos y ${Math.floor(Math.random() * 30) + 5} componentes reutilizables.`,
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "React 18", "Prisma", "PostgreSQL", "Docker", "GitHub Actions"],
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
          type: "warning",
          message: "Configuracion de seguridad incompleta",
          details: "Falta configurar Content Security Policy y headers de seguridad",
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
        "Implementar CI/CD con GitHub Actions",
        "Agregar monitoreo de errores con Sentry",
      ],
      codeQuality: Math.floor(Math.random() * 30) + 70,
      securityScore: Math.floor(Math.random() * 25) + 60,
      performanceScore: Math.floor(Math.random() * 20) + 75,
      maintainabilityScore: Math.floor(Math.random() * 25) + 70,
    })

    setIsAnalyzing(false)
  }

  const handleQuickAnalyze = (repo: string) => {
    setRepoUrl(`https://github.com/${repo}`)
    setTimeout(() => {
      handleAnalyze()
    }, 100)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
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
          {/* Input de URL */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <GitBranch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="https://github.com/usuario/repositorio o usuario/repositorio"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
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

          {/* Repositorios recientes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Analizar rapidamente:</span>
            {recentRepos.map((repo, index) => (
              <motion.button
                key={repo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickAnalyze(repo)}
                className="flex items-center gap-2 rounded-lg border border-orange-500/20 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500"
              >
                <FolderGit2 className="h-3 w-3" />
                {repo}
              </motion.button>
            ))}
          </div>

          {/* Pasos del analisis */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Progreso del analisis</span>
                  <span className="font-mono text-sm text-orange-500">
                    {Math.round(((analysisStep + 1) / analysisSteps.length) * 100)}%
                  </span>
                </div>
                <div className="mb-6 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {analysisSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === analysisStep
                    const isComplete = index < analysisStep
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: isActive || isComplete ? 1 : 0.4,
                          scale: isActive ? 1.05 : 1
                        }}
                        className={`flex items-center gap-2 rounded-lg p-2 text-xs ${
                          isActive 
                            ? "bg-orange-500/20 text-orange-500" 
                            : isComplete 
                              ? "text-green-500" 
                              : "text-muted-foreground"
                        }`}
                      >
                        {isActive ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                        <span className="truncate">{step.label.replace("...", "")}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info del repositorio */}
          <AnimatePresence>
            {repoInfo && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/20 ring-1 ring-orange-500/40">
                      <FolderGit2 className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">
                        <span className="text-orange-500">{repoInfo.owner}</span>/{repoInfo.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{repoInfo.description}</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-orange-500/20 px-3 py-1 text-xs font-bold text-orange-500">
                    {repoInfo.language}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <motion.div 
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(repoInfo.stars)}</p>
                      <p className="text-xs text-muted-foreground">Stars</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <GitFork className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(repoInfo.forks)}</p>
                      <p className="text-xs text-muted-foreground">Forks</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Eye className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-lg font-bold text-foreground">{formatNumber(repoInfo.watchers)}</p>
                      <p className="text-xs text-muted-foreground">Watchers</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <History className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{repoInfo.lastUpdate}</p>
                      <p className="text-xs text-muted-foreground">Actualizado</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-orange-500/10 pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {repoInfo.owner}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Creado en {repoInfo.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3 w-3" />
                    {repoInfo.defaultBranch}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {repoInfo.license}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCode className="h-3 w-3" />
                    {(repoInfo.size / 1000).toFixed(1)} MB
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resultados */}
          <AnimatePresence mode="wait">
            {results && !isAnalyzing && <AnalysisResults results={results} />}
          </AnimatePresence>

          {/* Estado vacio */}
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
              <p className="mt-2 text-sm text-muted-foreground/60">
                Soportamos URLs completas o formato usuario/repositorio
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
