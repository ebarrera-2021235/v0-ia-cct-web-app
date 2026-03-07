"use client"

import { motion } from "framer-motion"
import { Telescope, Github, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Telescope className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              DevScope <span className="text-orange-500">AI</span>
            </h1>
            <p className="hidden text-sm text-muted-foreground md:block">
              Analiza y mejora tu código con Inteligencia Artificial
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {["Analizador", "Debug", "Chat IA"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-orange-500"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden gap-2 border-border bg-transparent hover:border-orange-500/50 hover:text-orange-500 sm:flex"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              className="hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-orange-700 sm:flex"
            >
              Comenzar
            </Button>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
          className="border-t border-border bg-background px-6 py-5 lg:hidden"
        >
          <nav className="flex flex-col gap-4">
            {["Analizador", "Debug", "Chat IA"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-sm font-medium text-muted-foreground hover:text-orange-500"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
            <div className="flex gap-3 pt-3">
              <Button variant="outline" size="sm" className="flex-1 gap-2 hover:border-orange-500/50 hover:text-orange-500">
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
