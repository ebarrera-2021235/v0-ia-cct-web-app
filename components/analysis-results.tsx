"use client"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Info, Lightbulb, Layers, AlertTriangle } from "lucide-react"
import type { AnalysisResult } from "./repository-analyzer"

interface AnalysisResultsProps {
  results: AnalysisResult
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const getIssueIcon = (type: "error" | "warning" | "info") => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
    }
  }

  const getIssueBg = (type: "error" | "warning" | "info") => {
    switch (type) {
      case "error":
        return "border-red-500/30 bg-red-500/10"
      case "warning":
        return "border-amber-500/30 bg-amber-500/10"
      case "info":
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Resumen */}
      <motion.div 
        variants={itemVariants}
        className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Resumen del Proyecto</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{results.summary}</p>
          </div>
        </div>
      </motion.div>

      {/* Tecnologías */}
      <motion.div variants={itemVariants} className="rounded-xl border border-border bg-secondary/40 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Tecnologías Detectadas</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {results.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/30"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Problemas */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h4 className="flex items-center gap-2 font-semibold text-foreground">
          <AlertCircle className="h-5 w-5 text-muted-foreground" />
          Problemas Encontrados
        </h4>
        <div className="space-y-3">
          {results.issues.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`rounded-xl border p-4 ${getIssueBg(issue.type)}`}
            >
              <div className="flex items-start gap-3">
                {getIssueIcon(issue.type)}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{issue.message}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{issue.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recomendaciones */}
      <motion.div variants={itemVariants} className="rounded-xl border border-border bg-secondary/40 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          <h4 className="font-semibold text-foreground">Recomendaciones</h4>
        </div>
        <ul className="space-y-3">
          {results.recommendations.map((rec, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="flex items-start gap-3 text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
