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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
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
        whileHover={{ scale: 1.01, x: 4 }}
        className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/15 to-red-500/5 p-6"
      >
        <div className="flex items-start gap-4">
          <motion.div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-500/40"
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(239, 68, 68, 0.2)",
                "0 0 20px rgba(239, 68, 68, 0.4)",
                "0 0 10px rgba(239, 68, 68, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bug className="h-6 w-6 text-red-400" />
          </motion.div>
          <div>
            <h4 className="text-lg font-bold text-red-400">Error Detectado</h4>
            <p className="mt-2 leading-relaxed text-foreground">{result.error}</p>
          </div>
        </div>
      </motion.div>

      {/* Explicacion */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01, x: 4 }}
        className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 to-amber-500/5 p-6"
      >
        <div className="flex items-start gap-4">
          <motion.div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-500/40"
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(245, 158, 11, 0.2)",
                "0 0 20px rgba(245, 158, 11, 0.4)",
                "0 0 10px rgba(245, 158, 11, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="h-6 w-6 text-amber-400" />
          </motion.div>
          <div>
            <h4 className="text-lg font-bold text-amber-400">Explicacion del Problema</h4>
            <p className="mt-2 leading-relaxed text-foreground">{result.explanation}</p>
          </div>
        </div>
      </motion.div>

      {/* Codigo corregido */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-orange-500/5 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 ring-1 ring-orange-500/40"
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(249, 115, 22, 0.2)",
                  "0 0 20px rgba(249, 115, 22, 0.4)",
                  "0 0 10px rgba(249, 115, 22, 0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="h-6 w-6 text-orange-500" />
            </motion.div>
            <h4 className="text-lg font-bold">
              <span className="text-gradient">Codigo</span> Corregido
            </h4>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy} 
              className="gap-2 border-orange-500/20 bg-transparent hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-500">Copiado!</span>
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
          className="mt-5 overflow-x-auto rounded-xl bg-background p-6 text-sm ring-1 ring-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <code className="font-mono leading-relaxed text-foreground">{result.correctedCode}</code>
        </motion.pre>
      </motion.div>
    </motion.div>
  )
}
