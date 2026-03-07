"use client"

import { motion } from "framer-motion"
import { Sparkles, Github, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 border-b border-orange-500/10 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(249, 115, 22, 0.3)",
                "0 0 40px rgba(249, 115, 22, 0.5)",
                "0 0 20px rgba(249, 115, 22, 0.3)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-foreground">AI-</span>
              <span className="text-shine">CCT</span>
            </h1>
            <p className="hidden text-sm text-muted-foreground md:block">
              Analiza y mejora tu codigo con IA
            </p>
          </div>
        </motion.div>

        <nav className="hidden items-center gap-8 lg:flex">
          {["Analizador", "Debug", "Chat IA"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-orange-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <span className="relative">
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden gap-2 border-orange-500/20 bg-transparent text-muted-foreground hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500 sm:flex"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 sm:flex"
            >
              Comenzar
            </Button>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-orange-500 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-orange-500/10 bg-background/95 px-6 py-6 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-4">
            {["Analizador", "Debug", "Chat IA"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-orange-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" size="sm" className="flex-1 gap-2 border-orange-500/20 hover:border-orange-500/50 hover:text-orange-500">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                Comenzar
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
