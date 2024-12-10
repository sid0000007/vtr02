"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowLeftRight, FileText, MessageSquare, ArrowRight } from 'lucide-react'
import { DraggableNode } from "./draggableNode"

const tabs = [
  { name: "General", current: true },
  { name: "LLMs", current: false },
  { name: "Multi-Modal", current: false },
  { name: "Data Loaders", current: false },
  { name: "Vector DB", current: false },
  { name: "Logic", current: false },
  { name: "Chat", current: false },
]

const tools = [
  { type: "customInput", label: "Input", icon: ArrowLeftRight },
  { type: "llm", label: "LLM", icon: MessageSquare },
  { type: "customOutput", label: "Output", icon: ArrowRight },
  { type: "text", label: "Text", icon: FileText },
]

export function PipelineToolbar() {
  const [activeTab, setActiveTab] = React.useState("General")

  return (
    <div className="w-full bg-[#1B0A46]">
      {/* Tabs */}
      <div className="border-b border-indigo-900/50">
        <nav className="flex overflow-x-auto py-2 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "px-3 py-2 text-sm font-medium whitespace-nowrap",
                "hover:text-indigo-300 transition-colors",
                activeTab === tab.name
                  ? "text-indigo-300 border-b-2 border-indigo-300"
                  : "text-indigo-200"
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tools */}
      <div className="p-4 flex justify-start">
        <div className="flex flex-wrap gap-4 max-w-2xl">
          {tools.map((tool) => (
            <DraggableNode
              key={tool.type}
              type={tool.type}
              label={tool.label}
              icon={tool.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}