"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { RepositoryAnalyzer } from "@/components/repository-analyzer"
import { CodeDebugger } from "@/components/code-debugger"
import { AIChat } from "@/components/ai-chat"
import { Sparkles, Zap, Shield, Code2 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Análisis Rápido",
    description: "Obtén resultados en segundos con nuestro motor de análisis optimizado",
  },
  {
    icon: Shield,
    title: "Detección de Errores",
    description: "Identifica vulnerabilidades y bugs antes de que lleguen a producción",
  },
  {
    icon: Code2,
    title: "Código Corregido",
    description: "Recibe sugerencias de código corregido listo para usar",
  },
]

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          className="mb-20 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2.5"
            variants={itemVariants}
          >
            <Sparkles className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">Potenciado por IA</span>
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            Analiza y mejora tu código con
            <span className="block text-shine text-5xl sm:text-6xl lg:text-7xl">
              Inteligencia Artificial
            </span>
          </motion.h2>
          
          <motion.p 
            className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            AI-CCT te ayuda a detectar errores, analizar repositorios de GitHub y obtener 
            sugerencias inteligentes para mejorar la calidad de tu código.
          </motion.p>

          {/* Features */}
          <motion.div 
            className="mt-16 grid gap-6 sm:grid-cols-3"
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.div 
                key={feature.title}
                className="group rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/40 hover:bg-card/90"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30 transition-all group-hover:shadow-lg group-hover:shadow-orange-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-7 w-7 text-orange-500" />
                </motion.div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Main Tools - Animaciones basadas en scroll */}
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <RepositoryAnalyzer />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <AIChat />
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <CodeDebugger />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-24 border-t border-border pt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AI-<span className="text-shine">CCT</span>
            </span>
          </motion.div>
          <p className="mt-5 text-sm text-muted-foreground">
            Herramienta de análisis de código con Inteligencia Artificial para desarrolladores
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            2026 AI-CCT. Todos los derechos reservados.
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
