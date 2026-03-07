"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GitBranch, Loader2, FolderGit2, AlertCircle, CheckCircle2, FileCode } from "lucide-react"

interface AnalysisResult {
  status: "success" | "warning" | "error"
  message: string
  details?: string
}

export function RepoAnalyzer() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>([])

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return

    setIsAnalyzing(true)
    setResults([])

    // Simular análisis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResults([
      {
        status: "success",
        message: "Estructura del proyecto válida",
        details: "Se detectó correctamente la estructura de carpetas y archivos principales.",
      },
      {
        status: "warning",
        message: "Dependencias desactualizadas detectadas",
        details: "Se encontraron 3 dependencias que requieren actualización por seguridad.",
      },
      {
        status: "error",
        message: "Vulnerabilidad de seguridad encontrada",
        details: "El paquete 'lodash' tiene una vulnerabilidad conocida. Actualiza a la versión 4.17.21+",
      },
      {
        status: "success",
        message: "Configuración de TypeScript correcta",
        details: "El archivo tsconfig.json está configurado correctamente.",
      },
    ])

    setIsAnalyzing(false)
  }

  const getStatusIcon = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-primary" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />
    }
  }

  const getStatusBg = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "success":
        return "border-primary/30 bg-primary/5"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5"
      case "error":
        return "border-destructive/30 bg-destructive/5"
    }
  }

  return (
    <section id="analizador" className="scroll-mt-20">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FolderGit2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg text-card-foreground">Analizador de Repositorios</CardTitle>
              <CardDescription>
                Pega la URL de tu repositorio de GitHub para analizar su estructura y detectar problemas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <GitBranch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="https://github.com/usuario/repositorio"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="bg-input pl-10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !repoUrl.trim()} className="gap-2">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <FileCode className="h-4 w-4" />
                  Analizar Proyecto
                </>
              )}
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Resultados del análisis</h4>
              <div className="grid gap-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 transition-all ${getStatusBg(result.status)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{result.message}</p>
                        {result.details && (
                          <p className="mt-1 text-sm text-muted-foreground">{result.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isAnalyzing && results.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <FolderGit2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                Ingresa la URL de un repositorio de GitHub para comenzar el análisis
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
