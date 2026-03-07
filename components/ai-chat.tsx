"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Loader2, MessageSquare } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hola! Soy el asistente de AI-CCT. Puedo ayudarte con dudas sobre programacion, revision de codigo, mejores practicas y mas. En que puedo ayudarte hoy?",
  },
]

const AI_RESPONSES = [
  "Para optimizar ese codigo, te recomendaria usar `Array.map()` en lugar de un bucle for tradicional. Es mas legible y funcional.",
  "Ese error suele ocurrir cuando intentas acceder a una propiedad de un objeto que es `undefined`. Asegurate de validar que el objeto existe antes de acceder a sus propiedades.",
  "Una buena practica es usar TypeScript para evitar errores de tipo en tiempo de ejecucion. Te ayudara a detectar problemas antes de que lleguen a produccion.",
  "Para mejorar el rendimiento, considera usar `useMemo` o `useCallback` en React para memorizar valores y funciones que no cambian frecuentemente.",
  "Te sugiero dividir esa funcion en funciones mas pequenas con responsabilidades unicas. Esto sigue el principio de responsabilidad unica (SRP).",
]

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section id="chatia" className="scroll-mt-24">
      <Card className="overflow-hidden border-orange-500/10 bg-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-orange-500/10 bg-card/50 p-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: [
                  "0 0 15px rgba(249, 115, 22, 0.1)",
                  "0 0 25px rgba(249, 115, 22, 0.2)",
                  "0 0 15px rgba(249, 115, 22, 0.1)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <MessageSquare className="h-7 w-7 text-orange-500" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                <span className="text-gradient">Chat</span> con IA
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Preguntale a la IA sobre programacion
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {/* Area de mensajes */}
          <div className="h-[400px] overflow-y-auto rounded-2xl border border-orange-500/10 bg-background/50 p-5">
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: index === messages.length - 1 ? 0.1 : 0
                    }}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <motion.div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        message.role === "user" 
                          ? "bg-secondary ring-1 ring-border" 
                          : "bg-gradient-to-br from-orange-500 to-orange-600"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={message.role === "assistant" ? { 
                        boxShadow: [
                          "0 0 10px rgba(249, 115, 22, 0.2)",
                          "0 0 20px rgba(249, 115, 22, 0.4)",
                          "0 0 10px rgba(249, 115, 22, 0.2)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: message.role === "user" ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                          : "bg-secondary/80 text-foreground ring-1 ring-orange-500/10"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600"
                    animate={{ 
                      boxShadow: [
                        "0 0 10px rgba(249, 115, 22, 0.2)",
                        "0 0 25px rgba(249, 115, 22, 0.5)",
                        "0 0 10px rgba(249, 115, 22, 0.2)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Bot className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/80 px-5 py-4 ring-1 ring-orange-500/10">
                    <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                    <span className="text-sm text-muted-foreground">Escribiendo</span>
                    <motion.div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-orange-500"
                          animate={{ 
                            scale: [1, 1.5, 1], 
                            opacity: [0.4, 1, 0.4] 
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Campo de entrada */}
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta sobre codigo..."
              className="h-14 flex-1 border-orange-500/20 bg-background text-base text-foreground placeholder:text-muted-foreground focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
              disabled={isLoading}
            />
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                size="icon" 
                className="h-14 w-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>

          <p className="text-center font-mono text-xs text-muted-foreground/50">
            AI-CCT puede cometer errores. Verifica siempre la informacion importante.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
