"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
      error: "Error de indice fuera de rango (Off-by-one error)",
      explanation:
        "El bucle for utiliza 'i <= items.length' lo cual causa que se acceda a un indice que no existe. En JavaScript, los arrays estan indexados desde 0, por lo que el ultimo indice valido es 'length - 1'. Cuando i es igual a items.length, se intenta acceder a items[items.length], que es undefined, causando un error al intentar leer la propiedad 'precio' de undefined.",
      correctedCode: `function calcularTotal(items) {
  let total = 0
  for (let i = 0; i < items.length; i++) {
    total += items[i].precio
  }
  return total
}

// Alternativa mas moderna usando reduce:
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
      <Card className="h-full overflow-hidden border-orange-500/10 bg-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-orange-500/10 bg-card/50 p-6">
          <div className="flex items-center justify-between">
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
                <Bug className="h-7 w-7 text-orange-500" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  <span className="text-gradient">Debug</span> de Codigo
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  La IA detectara errores y te dara la solucion
                </p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadExample} 
                className="hidden border-orange-500/20 bg-transparent text-muted-foreground hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500 sm:flex"
              >
                Cargar ejemplo
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-medium text-foreground">Tu codigo</label>
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
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: code ? [
                    "0 0 0 1px rgba(249, 115, 22, 0.2)",
                    "0 0 0 1px rgba(249, 115, 22, 0.4)",
                    "0 0 0 1px rgba(249, 115, 22, 0.2)"
                  ] : "0 0 0 1px rgba(39, 39, 42, 1)"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ pointerEvents: "none" }}
              />
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Pega tu codigo aqui..."
                className="min-h-[240px] w-full resize-none rounded-2xl border border-orange-500/20 bg-background p-6 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                spellCheck={false}
              />
              <div className="absolute right-4 top-4 rounded-lg bg-secondary/80 p-2 ring-1 ring-orange-500/20">
                <Code2 className="h-4 w-4 text-orange-500/50" />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !code.trim()} 
                className="w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600 py-6 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 disabled:opacity-50 sm:w-auto sm:py-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analizando codigo...
                  </>
                ) : (
                  <>
                    <Bug className="h-5 w-5" />
                    Analizar Codigo
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
              className="rounded-2xl border border-dashed border-orange-500/20 bg-orange-500/5 p-16 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bug className="mx-auto h-20 w-20 text-orange-500/20" />
              </motion.div>
              <p className="mt-6 text-lg text-muted-foreground">
                Pega tu codigo para que la IA lo analice
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
