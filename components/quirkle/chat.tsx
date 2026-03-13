"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Bell, 
  Paperclip, 
  Mic, 
  Send, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  RefreshCw,
  ExternalLink,
  Check
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  code?: {
    html: string
    css: string
    js: string
  }
  preview?: {
    title: string
    url: string
    image?: string
  }
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "ai",
    content: "Here's a responsive card component with hover effects:",
    code: {
      html: `<div class="card">
  <div class="card-image">
    <img src="image.jpg" alt="Card">
  </div>
  <div class="card-content">
    <h3 class="card-title">Title</h3>
    <p class="card-text">Description</p>
    <button class="card-btn">Learn More</button>
  </div>
</div>`,
      css: `.card {
  background: #1a1a2e;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  color: #ffffff;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}`,
      js: `document.querySelector('.card-btn')
  .addEventListener('click', () => {
    console.log('Button clicked!');
  });`
    },
    preview: {
      title: "Live Preview - Card Component",
      url: "https://codepen.io/preview/card"
    }
  }
]

export function QuirkleChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html")
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I understand you want to create something. Let me help you with that. Here's a solution:"
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCodeContent = (code: Message["code"]) => {
    if (!code) return ""
    switch (activeTab) {
      case "html": return code.html
      case "css": return code.css
      case "js": return code.js
      default: return code.html
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-[#0f0f1a]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h1 className="text-xl font-semibold text-white">AI Chat Helper</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-64 rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500/50"
            />
          </div>
          
          <motion.button
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
              3
            </span>
          </motion.button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`mb-6 ${message.type === "user" ? "flex justify-end" : ""}`}
            >
              {message.type === "user" ? (
                <div className="max-w-md rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-white">
                  {message.content}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-300">{message.content}</p>
                  
                  {message.code && (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e]">
                      {/* Code Tabs */}
                      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
                        <div className="flex gap-1">
                          {(["html", "css", "js"] as const).map(tab => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                                activeTab === tab
                                  ? "bg-violet-600/20 text-violet-400"
                                  : "text-gray-500 hover:text-gray-300"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        
                        <motion.button
                          onClick={() => handleCopyCode(getCodeContent(message.code))}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-green-500" />
                              <span className="text-green-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy code</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                      
                      {/* Code Content */}
                      <div className="relative max-h-64 overflow-auto">
                        <pre className="p-4 text-sm">
                          <code className="font-mono">
                            {getCodeContent(message.code).split("\n").map((line, i) => (
                              <div key={i} className="flex">
                                <span className="mr-4 w-6 select-none text-right text-gray-600">
                                  {i + 1}
                                </span>
                                <span className="text-gray-300">
                                  {line.split(/(["'][^"']*["']|\/\/.*|\/\*[\s\S]*?\*\/)/g).map((part, j) => {
                                    if (part.startsWith('"') || part.startsWith("'")) {
                                      return <span key={j} className="text-green-400">{part}</span>
                                    }
                                    if (part.startsWith("//") || part.startsWith("/*")) {
                                      return <span key={j} className="text-gray-500">{part}</span>
                                    }
                                    return <span key={j}>{part}</span>
                                  })}
                                </span>
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {message.preview && (
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
                          <ExternalLink className="h-5 w-5 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{message.preview.title}</p>
                          <p className="text-xs text-gray-500">{message.preview.url}</p>
                        </div>
                      </div>
                      <motion.button
                        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View
                      </motion.button>
                    </div>
                  )}
                  
                  {/* Message Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Regenerate Button */}
      <div className="flex justify-center pb-4">
        <motion.button
          className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-600/10 px-4 py-2 text-sm text-violet-400 transition-colors hover:bg-violet-600/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate response
        </motion.button>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 px-6 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <motion.button
            className="text-gray-500 transition-colors hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Paperclip className="h-5 w-5" />
          </motion.button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Start typing..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          
          <motion.button
            className="text-gray-500 transition-colors hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            onClick={handleSend}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
        
        <p className="mt-3 text-center text-xs text-gray-600">
          Quirkle AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  )
}
