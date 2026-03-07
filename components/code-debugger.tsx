"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, Loader2, Lightbulb, CheckCircle2, Code2, Copy, Check } from "lucide-react"

const EXAMPLE_CODE = `function calcularTotal(items) {
  let total = 0
  for (let i = 0; i <= items.length; i++) {
    total += items[i].precio
  }
  return total
}

const resultado = calcularTotal([
  { nombre: "Producto 1", precio: 100 },
  { nombre: "Producto 2", precio: 200 }
])
console.log(resultado)`

interface DebugResult {
  error: string
  explanation: string
  correctedCode: string
}

export function CodeDebugger() {
  const [code, setCode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DebugResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    await new Promise((resolve) => setTimeout(resolve, 2500))

    setResult({
      error: "Error de índice fuera de rango (Off-by-one error)",
      explanation:
        "El bucle for utiliza 'i <= items.length' lo cual causa que se acceda a un índice que no existe. En JavaScript, los arrays están indexados desde 0, por lo que el último índice válido es 'length - 1'. Cuando i es igual a items.length, se intenta acceder a items[items.length], que es undefined, causando un error al intentar leer la propiedad 'precio' de undefined.",
      correctedCode: `function calcularTotal(items) {
  let total = 0
  for (let i = 0; i < items.length; i++) {
    total += items[i].precio
  }
  return total
}

// Alternativa más moderna usando reduce:
function calcularTotalModerno(items) {
  return items.reduce((total, item) => total + item.precio, 0)
}

const resultado = calcularTotal([
  { nombre: "Producto 1", precio: 100 },
  { nombre: "Producto 2", precio: 200 }
])
console.log(resultado) // Output: 300`,
    })

    setIsAnalyzing(false)
  }

  const handleCopy = async () => {
    if (result?.correctedCode) {
      await navigator.clipboard.writeText(result.correctedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const loadExample = () => {
    setCode(EXAMPLE_CODE)
    setResult(null)
  }

  return (
    <section id="debug" className="scroll-mt-20">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Bug className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg text-card-foreground">Debug de Código con IA</CardTitle>
                <CardDescription>
                  Pega tu código y la IA detectará errores, los explicará y te dará la solución
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={loadExample} className="hidden sm:flex">
              Cargar ejemplo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Tu código</label>
              <Button variant="ghost" size="sm" onClick={loadExample} className="sm:hidden">
                Cargar ejemplo
              </Button>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Pega tu código aquí..."
                className="min-h-[200px] w-full resize-none rounded-lg border border-border bg-input p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                spellCheck={false}
              />
              <div className="absolute right-3 top-3">
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !code.trim()} className="w-full gap-2 sm:w-auto">
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analizando código...
                </>
              ) : (
                <>
                  <Bug className="h-4 w-4" />
                  Analizar Código
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              {/* Error detectado */}
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <Bug className="mt-0.5 h-5 w-5 text-destructive" />
                  <div>
                    <h4 className="font-medium text-destructive">Error detectado</h4>
                    <p className="mt-1 text-sm text-foreground">{result.error}</p>
                  </div>
                </div>
              </div>

              {/* Explicación */}
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-yellow-500">Explicación del problema</h4>
                    <p className="mt-1 text-sm text-foreground">{result.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Código corregido */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-primary">Código corregido</h4>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-4 text-sm">
                  <code className="text-foreground">{result.correctedCode}</code>
                </pre>
              </div>
            </div>
          )}

          {!isAnalyzing && !result && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <Bug className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                Pega tu código en el editor para que la IA lo analice y detecte posibles errores
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
