"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Loader2, Sparkles, MessageSquare } from "lucide-react"

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
      "¡Hola! Soy el asistente de DevScope AI. Puedo ayudarte con dudas sobre programación, revisión de código, mejores prácticas y más. ¿En qué puedo ayudarte hoy?",
  },
]

const AI_RESPONSES = [
  "Para optimizar ese código, te recomendaría usar `Array.map()` en lugar de un bucle for tradicional. Es más legible y funcional.",
  "Ese error suele ocurrir cuando intentas acceder a una propiedad de un objeto que es `undefined`. Asegúrate de validar que el objeto existe antes de acceder a sus propiedades.",
  "Una buena práctica es usar TypeScript para evitar errores de tipo en tiempo de ejecución. Te ayudará a detectar problemas antes de que lleguen a producción.",
  "Para mejorar el rendimiento, considera usar `useMemo` o `useCallback` en React para memorizar valores y funciones que no cambian frecuentemente.",
  "Te sugiero dividir esa función en funciones más pequeñas con responsabilidades únicas. Esto sigue el principio de responsabilidad única (SRP).",
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
    <motion.section 
      id="chatia" 
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border bg-card/80 pb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle className="text-xl font-semibold text-card-foreground">
                Chat con IA
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Pregúntale a la IA sobre programación y mejores prácticas
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {/* Área de mensajes */}
          <div className="h-[380px] overflow-y-auto rounded-xl border border-border bg-input/50 p-5">
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <motion.div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ${
                        message.role === "user" 
                          ? "bg-secondary ring-1 ring-border" 
                          : "bg-gradient-to-br from-primary to-primary/70 shadow-primary/20"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-secondary-foreground" />
                      ) : (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      )}
                    </motion.div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                          : "bg-secondary/80 text-secondary-foreground ring-1 ring-border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-secondary/80 px-5 py-3 ring-1 ring-border">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Escribiendo...</span>
                    <motion.div 
                      className="flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
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
              placeholder="Escribe tu pregunta sobre código..."
              className="h-12 flex-1 bg-input text-base text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              disabled={isLoading}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                size="icon" 
                className="h-12 w-12 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            DevScope AI puede cometer errores. Verifica siempre la información importante.
          </p>
        </CardContent>
      </Card>
    </motion.section>
  )
}
