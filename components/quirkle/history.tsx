"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Check } from "lucide-react"

interface HistoryItem {
  id: string
  title: string
  description: string
  selected: boolean
}

const initialHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Responsive Card Component",
    description: "Created a modern card with hover effects and gradient background styling",
    selected: false
  },
  {
    id: "2",
    title: "Navigation Menu",
    description: "Built a responsive navigation with dropdown menus and mobile hamburger",
    selected: false
  },
  {
    id: "3",
    title: "Login Form Design",
    description: "Designed a sleek login form with validation and social auth buttons",
    selected: false
  },
  {
    id: "4",
    title: "Dashboard Layout",
    description: "Created a 3-column dashboard layout with sidebar and statistics cards",
    selected: false
  },
  {
    id: "5",
    title: "Modal Component",
    description: "Built an accessible modal with animations and backdrop blur effect",
    selected: false
  },
  {
    id: "6",
    title: "Data Table",
    description: "Designed a sortable data table with pagination and search functionality",
    selected: false
  },
]

export function QuirkleHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory)

  const toggleSelect = (id: string) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const clearSelected = () => {
    setHistory(prev => prev.filter(item => !item.selected))
  }

  const selectedCount = history.filter(item => item.selected).length

  return (
    <aside className="flex h-full w-[260px] flex-col border-l border-white/5 bg-[#12121f]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
        <h2 className="text-lg font-semibold text-white">History</h2>
        <span className="rounded-full bg-violet-600/20 px-2.5 py-1 text-xs font-medium text-violet-400">
          {history.length}/50
        </span>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="popLayout">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`group mb-2 cursor-pointer rounded-xl border p-3 transition-all ${
                item.selected
                  ? "border-violet-500/50 bg-violet-600/10"
                  : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
              }`}
              onClick={() => toggleSelect(item.id)}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
                    item.selected
                      ? "border-violet-500 bg-violet-600"
                      : "border-white/20 bg-transparent group-hover:border-white/40"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {item.selected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <div className="flex-1 overflow-hidden">
                  <h3 className="mb-1 truncate text-sm font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Clear Button */}
      <div className="border-t border-white/5 p-3">
        <motion.button
          onClick={clearSelected}
          disabled={selectedCount === 0}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            selectedCount > 0
              ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
              : "bg-white/5 text-gray-500 cursor-not-allowed"
          }`}
          whileHover={selectedCount > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedCount > 0 ? { scale: 0.98 } : {}}
        >
          <Trash2 className="h-4 w-4" />
          {selectedCount > 0 ? `Clear selected (${selectedCount})` : "Clear history"}
        </motion.button>
      </div>
    </aside>
  )
}
