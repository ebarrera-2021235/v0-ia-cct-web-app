"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, User, Send, Loader2, Sparkles } from "lucide-react"

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
      "¡Hola! Soy el asistente de IA-CCT. Puedo ayudarte con dudas sobre programación, revisión de código, mejores prácticas y más. ¿En qué puedo ayudarte hoy?",
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

    // Simular respuesta de la IA
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
    <section id="chat" className="scroll-mt-20">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg text-card-foreground">Chat con IA</CardTitle>
              <CardDescription>
                Pregúntale a la IA sobre programación, debugging, mejores prácticas y más
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Área de mensajes */}
          <div className="h-[400px] overflow-y-auto rounded-lg border border-border bg-input p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.role === "user" ? "bg-secondary" : "bg-primary"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-secondary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Escribiendo...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Campo de entrada */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu pregunta sobre código..."
              className="flex-1 bg-input text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            La IA puede cometer errores. Verifica siempre la información importante.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
