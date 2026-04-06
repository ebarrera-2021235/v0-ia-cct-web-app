"use client"

import { Bot, Github, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">IA-CCT</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Analiza y mejora tu código con Inteligencia Artificial
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#analizador" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Analizador
          </a>
          <a href="#debug" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Debug
          </a>
          <a href="#chat" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Chat IA
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button size="sm" className="hidden sm:flex">
            Comenzar
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#analizador" className="text-sm text-muted-foreground hover:text-foreground">
              Analizador
            </a>
            <a href="#debug" className="text-sm text-muted-foreground hover:text-foreground">
              Debug
            </a>
            <a href="#chat" className="text-sm text-muted-foreground hover:text-foreground">
              Chat IA
            </a>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button size="sm" className="flex-1">
                Comenzar
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
