"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Github, Menu, X, Star, GitFork, ExternalLink, Settings, Bell, Command, Search, ChevronDown, Zap, BookOpen, MessageSquare, History, Keyboard } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Keyboard shortcut para búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
        setShowQuickActions(false)
        setShowNotifications(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const notifications = [
    { id: 1, type: "success", message: "Analisis completado: react/react", time: "hace 2 min" },
    { id: 2, type: "warning", message: "3 vulnerabilidades encontradas", time: "hace 5 min" },
    { id: 3, type: "info", message: "Nueva version de AI-CCT disponible", time: "hace 1 hora" },
  ]

  const quickActions = [
    { icon: Search, label: "Buscar repositorio", shortcut: "Ctrl+K", action: () => setSearchOpen(true) },
    { icon: History, label: "Historial de analisis", shortcut: "Ctrl+H", action: () => {} },
    { icon: BookOpen, label: "Documentacion", shortcut: "Ctrl+D", action: () => {} },
    { icon: MessageSquare, label: "Abrir chat IA", shortcut: "Ctrl+J", action: () => document.getElementById("chatia")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: Settings, label: "Configuracion", shortcut: "Ctrl+,", action: () => {} },
  ]

  const recentSearches = [
    "vercel/next.js",
    "facebook/react",
    "tailwindlabs/tailwindcss",
    "microsoft/vscode",
  ]

  return (
    <>
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

          <div className="flex items-center gap-2">
            {/* Botón de búsqueda rápida */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-xl border border-orange-500/20 bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-all hover:border-orange-500/40 hover:bg-orange-500/10 sm:flex"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Buscar...</span>
              <kbd className="hidden rounded bg-secondary px-1.5 py-0.5 font-mono text-xs lg:inline">
                <Command className="inline h-3 w-3" />K
              </kbd>
            </motion.button>

            {/* Botón de acciones rápidas */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                onClick={() => {
                  setShowQuickActions(!showQuickActions)
                  setShowNotifications(false)
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-transparent text-muted-foreground transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500"
              >
                <Zap className="h-4 w-4" />
              </motion.button>

              <AnimatePresence>
                {showQuickActions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-orange-500/20 bg-card shadow-xl shadow-black/50"
                  >
                    <div className="border-b border-orange-500/10 bg-orange-500/5 p-3">
                      <span className="text-xs font-semibold text-orange-500">Acciones Rapidas</span>
                    </div>
                    <div className="p-1">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            action.action()
                            setShowQuickActions(false)
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground transition-all hover:bg-orange-500/10"
                        >
                          <div className="flex items-center gap-3">
                            <action.icon className="h-4 w-4 text-muted-foreground" />
                            <span>{action.label}</span>
                          </div>
                          <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                            {action.shortcut}
                          </kbd>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notificaciones */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowQuickActions(false)
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-transparent text-muted-foreground transition-all hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  3
                </span>
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-orange-500/20 bg-card shadow-xl shadow-black/50"
                  >
                    <div className="flex items-center justify-between border-b border-orange-500/10 bg-orange-500/5 p-3">
                      <span className="text-xs font-semibold text-orange-500">Notificaciones</span>
                      <button className="text-xs text-muted-foreground hover:text-orange-500">
                        Marcar todas leidas
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-1">
                      {notifications.map((notif, index) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-orange-500/10"
                        >
                          <div className={`mt-0.5 h-2 w-2 rounded-full ${
                            notif.type === "success" ? "bg-green-500" :
                            notif.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{notif.message}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub button mejorado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="relative"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden gap-2 border-orange-500/20 bg-transparent text-muted-foreground hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500 sm:flex"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">GitHub</span>
                <div className="hidden items-center gap-1 border-l border-orange-500/20 pl-2 lg:flex">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs">2.4k</span>
                </div>
              </Button>
            </motion.div>

            {/* Comenzar button mejorado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                onClick={() => document.getElementById("analizador")?.scrollIntoView({ behavior: "smooth" })}
                className="hidden gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 sm:flex"
              >
                <Sparkles className="h-4 w-4" />
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
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    document.getElementById("analizador")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Comenzar
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Modal de búsqueda rápida */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-24 z-[101] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-orange-500/20 bg-card shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 border-b border-orange-500/10 p-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar repositorio (ej: vercel/next.js)"
                  autoFocus
                  className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>
              <div className="p-2">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Busquedas recientes</div>
                {recentSearches.map((repo, index) => (
                  <motion.button
                    key={repo}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSearchOpen(false)
                      const input = document.querySelector("#analizador input") as HTMLInputElement
                      if (input) {
                        input.value = `https://github.com/${repo}`
                        input.focus()
                      }
                      document.getElementById("analizador")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-all hover:bg-orange-500/10"
                  >
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span>{repo}</span>
                    <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-orange-500/10 bg-secondary/30 px-4 py-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Keyboard className="h-3 w-3" />
                    para navegar
                  </span>
                  <span className="flex items-center gap-1">
                    Enter para seleccionar
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
