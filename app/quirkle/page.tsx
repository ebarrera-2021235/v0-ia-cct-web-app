"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuirkleSidebar } from "@/components/quirkle/sidebar"
import { QuirkleChat } from "@/components/quirkle/chat"
import { QuirkleHistory } from "@/components/quirkle/history"

export default function QuirklePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-[#0f0f1a] text-white overflow-hidden">
      {/* Left Sidebar */}
      <QuirkleSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Center Panel */}
      <QuirkleChat />

      {/* Right Panel - History */}
      <QuirkleHistory />

      {/* Floating AI Avatar */}
      <motion.button
        className="fixed bottom-24 right-72 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-purple-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.3)",
            "0 0 40px rgba(139, 92, 246, 0.5)",
            "0 0 20px rgba(139, 92, 246, 0.3)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </motion.button>
    </div>
  )
}
