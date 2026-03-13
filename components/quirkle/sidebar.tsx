"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  LayoutTemplate, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  Zap,
  X,
  Sparkles
} from "lucide-react"

interface QuirkleSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { icon: MessageSquare, label: "AI Chat Helper", active: true },
  { icon: LayoutTemplate, label: "Templates", pro: true },
  { icon: FolderKanban, label: "My Projects" },
  { icon: BarChart3, label: "Statistics", pro: true },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Updates & FAQ" },
]

export function QuirkleSidebar({ collapsed, onToggle }: QuirkleSidebarProps) {
  return (
    <motion.aside
      className="relative flex h-full flex-col border-r border-white/5 bg-[#12121f]"
      animate={{ width: collapsed ? 70 : 220 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        <motion.div 
          className="flex items-center gap-2"
          animate={{ opacity: collapsed ? 0 : 1 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <motion.span 
              className="text-lg font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Quirkle
            </motion.span>
          )}
        </motion.div>
        
        <motion.button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
              item.active 
                ? "bg-gradient-to-r from-violet-600/20 to-purple-600/10 text-white" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
            whileHover={{ x: 4 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <item.icon className={`h-5 w-5 flex-shrink-0 ${item.active ? "text-violet-400" : ""}`} />
            
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="flex-1 truncate text-sm font-medium"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            
            {item.pro && !collapsed && (
              <span className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                PRO
              </span>
            )}
            
            {item.active && (
              <motion.div
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-violet-500"
                layoutId="activeNav"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Pro Card */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="mx-3 mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/30 to-purple-700/20 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <button className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white">
              <X className="h-3 w-3" />
            </button>
            
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white">Pro Plan</span>
            </div>
            
            <p className="mb-3 text-xs text-gray-300">
              Unlock all features and get unlimited access
            </p>
            
            <div className="mb-3">
              <span className="text-2xl font-bold text-white">$10</span>
              <span className="text-sm text-gray-400">/mo</span>
            </div>
            
            <motion.button
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-2.5 text-sm font-semibold text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get PRO
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout */}
      <div className="border-t border-white/5 p-3">
        <motion.button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          whileHover={{ x: 4 }}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </motion.button>
      </div>
    </motion.aside>
  )
}
