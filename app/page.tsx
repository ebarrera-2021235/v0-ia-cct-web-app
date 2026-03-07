"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { RepositoryAnalyzer } from "@/components/repository-analyzer"
import { CodeDebugger } from "@/components/code-debugger"
import { AIChat } from "@/components/ai-chat"
import { Telescope, Zap, Shield, Code2 } from "lucide-react"

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Telescope className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Potenciado por IA</span>
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Analiza y mejora tu código con
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Inteligencia Artificial
            </span>
          </motion.h2>
          
          <motion.p 
            className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            DevScope AI te ayuda a detectar errores, analizar repositorios de GitHub y obtener 
            sugerencias inteligentes para mejorar la calidad de tu código.
          </motion.p>

          {/* Features */}
          <motion.div 
            className="mt-14 grid gap-6 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="group rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="mb-3 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Main Tools */}
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="space-y-8">
            <RepositoryAnalyzer />
            <AIChat />
          </div>
          <div>
            <CodeDebugger />
          </div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="mt-20 border-t border-border pt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
              <Telescope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              DevScope <span className="text-primary">AI</span>
            </span>
          </motion.div>
          <p className="mt-5 text-sm text-muted-foreground">
            Herramienta de análisis de código con Inteligencia Artificial para desarrolladores
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            © 2026 DevScope AI. Todos los derechos reservados.
          </p>
        </motion.footer>
      </main>
    </div>
  )
}
