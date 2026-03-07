"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { RepositoryAnalyzer } from "@/components/repository-analyzer"
import { CodeDebugger } from "@/components/code-debugger"
import { AIChat } from "@/components/ai-chat"
import { Sparkles, Zap, Shield, Code2, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Analisis Rapido",
    description: "Obtén resultados en segundos con nuestro motor de analisis optimizado",
  },
  {
    icon: Shield,
    title: "Deteccion de Errores",
    description: "Identifica vulnerabilidades y bugs antes de que lleguen a produccion",
  },
  {
    icon: Code2,
    title: "Codigo Corregido",
    description: "Recibe sugerencias de codigo corregido listo para usar",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Gradiente radial de fondo */}
      <div className="fixed inset-0 bg-radial-orange pointer-events-none" />
      
      <Header />
      
      <main className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Hero Section */}
        <motion.section 
          className="mb-24 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2.5"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 0.6)" }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-5 w-5 text-orange-500" />
            </motion.div>
            <span className="text-sm font-medium text-orange-500">Potenciado por Inteligencia Artificial</span>
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
            variants={fadeInUp}
          >
            <span className="text-foreground">Analiza y mejora tu codigo</span>
            <br />
            <span className="text-foreground">con </span>
            <span className="text-shine">Inteligencia Artificial</span>
          </motion.h2>
          
          <motion.p 
            className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
            variants={fadeInUp}
          >
            AI-CCT te ayuda a detectar errores, analizar repositorios de GitHub y obtener 
            sugerencias inteligentes para mejorar la calidad de tu codigo.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <motion.a
              href="#analizador"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/25"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Comenzar ahora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#debug"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-transparent px-8 py-4 font-semibold text-foreground transition-colors hover:border-orange-500/60 hover:bg-orange-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver demo
            </motion.a>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mt-24 grid gap-6 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="group relative rounded-2xl border border-orange-500/10 bg-card/50 p-8 backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  borderColor: "rgba(249, 115, 22, 0.4)",
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="h-8 w-8 text-orange-500" />
                </motion.div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                {/* Numero de seccion estilo cursorguatemala */}
                <span className="absolute right-6 top-6 font-mono text-sm text-orange-500/30">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Seccion Analizador */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-sm text-orange-500">// analizador</span>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
          </div>
          <RepositoryAnalyzer />
        </motion.section>

        {/* Grid de Debug y Chat */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Seccion Debug */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-sm text-orange-500">// debug</span>
              <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </div>
            <CodeDebugger />
          </motion.section>

          {/* Seccion Chat */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-sm text-orange-500">// chat ia</span>
              <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </div>
            <AIChat />
          </motion.section>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-32 border-t border-orange-500/10 pt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.3)",
                  "0 0 40px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold">
              <span className="text-foreground">AI-</span>
              <span className="text-shine">CCT</span>
            </span>
          </motion.div>
          <p className="mt-6 text-sm text-muted-foreground">
            Herramienta de analisis de codigo con Inteligencia Artificial
          </p>
          <p className="mt-4 font-mono text-xs text-orange-500/50">
            2026 AI-CCT. Todos los derechos reservados.
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
