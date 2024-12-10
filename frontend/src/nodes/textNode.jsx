'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Position, Handle } from '@xyflow/react'
import { BaseNode } from './baseNode'
import { Card } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'

export function TextNode(props) {
  const [dynamicState, setDynamicState] = useState({
    text: props.data?.text || '{{input}}'
  })
  const textInputRef = useRef(null)

  const updateNodeSize = () => {
    if (textInputRef.current) {
      const textarea = textInputRef.current.querySelector('textarea')
      if (textarea) {
        const width = Math.max(textarea.scrollWidth + 40, 200)
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight)
        const lines = Math.max(textarea.value.split('\n').length, 1)
        const height = Math.max(lines * lineHeight + 40, 80)

        if (props.handleSizeChange) {
          props.handleSizeChange(width, height)
        }
      }
    }
  }

  useEffect(() => {
    updateNodeSize()
  }, [dynamicState.text])

  const handleTextChange = (e) => {
    const newText = e.target.value
    setDynamicState((prev) => ({
      ...prev,
      text: newText
    }))
  }

  const getVariables = () => {
    const regex = /\{\{\s*(\w+)\s*\}\}/g
    const matches = [...dynamicState.text.matchAll(regex)]
    return [...new Set(matches.map((match) => match[1]))]
  }

  const renderContent = () => {
    const variables = getVariables()

    return (
      <Card className="bg-white border-[#e5e7eb] shadow-sm">
        <div className="flex items-center justify-between p-3 border-b border-[#e5e7eb]">
        </div>
        <div className="p-4 space-y-4" ref={textInputRef}>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Text </label>
            <Textarea
              value={dynamicState.text}
              onChange={handleTextChange}
              className="min-h-[100px] border-[#e5e7eb] resize-none"
              placeholder="Enter text with {{variables}}"
            />
          </div>
          {variables.map((variable, index) => (
            <Handle
              key={`${props.id}-${variable}`}
              type="target"
              position={Position.Left}
              id={`${props.id}-${variable}`}
              // className="absolute left-0 transform -translate-x-full bg-blue-500 text-white rounded-full px-2 py-1"
              style={{
                width: 8,
                height: 8,
                background: "white",
                border: "4px solid black",               
              }}
            />
          ))}
        </div>
      </Card>
    )
  }

  return (
    <BaseNode
      {...props}
      nodeType="text"
      handles={{
        target: { position: Position.Left, id: 'input' },
        source: { position: Position.Right, id: 'output' }
      }}
      renderContent={renderContent}
      handleSizeChange={updateNodeSize}
    />
  )
}