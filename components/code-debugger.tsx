"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, Loader2, Code2 } from "lucide-react"
import { DebugResults } from "./debug-results"

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

export interface DebugResult {
  error: string
  explanation: string
  correctedCode: string
}

export function CodeDebugger() {
  const [code, setCode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DebugResult | null>(null)

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

  const loadExample = () => {
    setCode(EXAMPLE_CODE)
    setResult(null)
  }

  return (
    <section id="debug" className="scroll-mt-24">
      <Card className="h-full overflow-hidden border-border bg-card/60 backdrop-blur-sm">
        <CardHeader className="border-b border-border bg-card/80 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Bug className="h-6 w-6 text-orange-500" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  <span className="text-shine-slow">Debug</span> de Código
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  La IA detectará errores y te dará la solución
                </p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadExample} 
                className="hidden border-border bg-secondary/50 hover:border-orange-500/50 hover:bg-secondary hover:text-orange-500 sm:flex"
              >
                Cargar ejemplo
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Tu código</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={loadExample} 
                className="text-muted-foreground hover:text-orange-500 sm:hidden"
              >
                Cargar ejemplo
              </Button>
            </div>
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Pega tu código aquí..."
                className="min-h-[220px] w-full resize-none rounded-xl border border-border bg-input p-5 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                spellCheck={false}
              />
              <div className="absolute right-4 top-4 rounded-lg bg-secondary/80 p-2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !code.trim()} 
                className="w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600 py-6 text-base font-medium text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 disabled:opacity-50 sm:w-auto sm:py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analizando código...
                  </>
                ) : (
                  <>
                    <Bug className="h-5 w-5" />
                    Analizar Código
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {result && <DebugResults result={result} />}
          </AnimatePresence>

          {!isAnalyzing && !result && (
            <motion.div 
              className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bug className="mx-auto h-16 w-16 text-muted-foreground/30" />
              </motion.div>
              <p className="mt-6 text-muted-foreground">
                Pega tu código en el editor para que la IA lo analice
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
