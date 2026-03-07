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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const getIssueStyles = (type: "error" | "warning" | "info") => {
    switch (type) {
      case "error":
        return {
          icon: AlertCircle,
          border: "border-red-500/30",
          bg: "bg-red-500/10",
          text: "text-red-400",
          glow: "hover:shadow-red-500/10"
        }
      case "warning":
        return {
          icon: AlertTriangle,
          border: "border-amber-500/30",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          glow: "hover:shadow-amber-500/10"
        }
      case "info":
        return {
          icon: Info,
          border: "border-blue-500/30",
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          glow: "hover:shadow-blue-500/10"
        }
    }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Resumen */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01, y: -4 }}
        className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/15 to-orange-600/5 p-6"
      >
        <div className="flex items-start gap-4">
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
          <div>
            <h4 className="text-lg font-bold text-foreground">
              <span className="text-gradient">Resumen</span> del Proyecto
            </h4>
            <p className="mt-2 leading-relaxed text-muted-foreground">{results.summary}</p>
          </div>
        </div>
      </motion.div>

      {/* Tecnologias */}
      <motion.div 
        variants={itemVariants} 
        className="rounded-2xl border border-orange-500/10 bg-card/50 p-6"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 ring-1 ring-orange-500/30">
            <Layers className="h-5 w-5 text-orange-500" />
          </div>
          <h4 className="text-lg font-bold text-foreground">Tecnologias Detectadas</h4>
          <span className="ml-auto font-mono text-sm text-orange-500/50">{results.technologies.length} tech</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {results.technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="cursor-default rounded-xl bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/30 transition-shadow hover:shadow-lg hover:shadow-orange-500/20"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Problemas */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 ring-1 ring-orange-500/30">
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <h4 className="text-lg font-bold text-foreground">Problemas Encontrados</h4>
          <span className="ml-auto font-mono text-sm text-orange-500/50">{results.issues.length} issues</span>
        </div>
        <div className="space-y-3">
          {results.issues.map((issue, index) => {
            const styles = getIssueStyles(issue.type)
            const Icon = styles.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.12, duration: 0.6 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className={`rounded-xl border ${styles.border} ${styles.bg} p-5 transition-shadow hover:shadow-xl ${styles.glow}`}
              >
                <div className="flex items-start gap-4">
                  <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${styles.text}`} />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{issue.message}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{issue.details}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/50">#{String(index + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Recomendaciones */}
      <motion.div variants={itemVariants} className="rounded-2xl border border-orange-500/10 bg-card/50 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-500/30">
            <Lightbulb className="h-5 w-5 text-amber-500" />
          </div>
          <h4 className="text-lg font-bold text-foreground">Recomendaciones</h4>
        </div>
        <ul className="space-y-3">
          {results.recommendations.map((rec, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 8 }}
              className="flex items-start gap-4 rounded-xl border border-orange-500/10 bg-orange-500/5 p-4"
            >
              <span className="font-mono text-sm font-bold text-orange-500">0{index + 1}</span>
              <span className="text-sm leading-relaxed text-foreground">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
