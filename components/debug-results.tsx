"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bug, Lightbulb, CheckCircle2, Copy, Check } from "lucide-react"
import type { DebugResult } from "./code-debugger"

interface DebugResultsProps {
  result: DebugResult
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function DebugResults({ result }: DebugResultsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.correctedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Error detectado */}
      <motion.div 
        variants={itemVariants}
        className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-500/15 to-red-500/5 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
            <Bug className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h4 className="font-semibold text-red-400">Error Detectado</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{result.error}</p>
          </div>
        </div>
      </motion.div>

      {/* Explicación */}
      <motion.div 
        variants={itemVariants}
        className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-amber-500/5 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
            <Lightbulb className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-400">Explicación del Problema</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{result.explanation}</p>
          </div>
        </div>
      </motion.div>

      {/* Código corregido */}
      <motion.div 
        variants={itemVariants}
        className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-primary">Código Corregido</h4>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy} 
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-primary">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </Button>
          </motion.div>
        </div>
        <motion.pre 
          className="mt-4 overflow-x-auto rounded-xl bg-background/80 p-5 text-sm ring-1 ring-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <code className="font-mono leading-relaxed text-foreground">{result.correctedCode}</code>
        </motion.pre>
      </motion.div>
    </motion.div>
  )
}
