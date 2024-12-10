

'use client'

import React, { useEffect, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Card } from '@/components/ui/card'
import { Info, X } from 'lucide-react'
import { Button } from '../components/ui/button'



export const BaseNode = ({
  id,
  data,
  nodeType,
  handles = {
    target: { position: Position.Left, id: 'target' },
    source: { position: Position.Right, id: 'source' }
  },
  renderContent,
  initialState = {},
  onNodeResize,
}) => {
  const stateConfig = {
    input: {
      nameKey: 'inputName',
      typeKey: 'inputType',
      defaultTypes: ['Text', 'File'],
      namePrefix: 'input_'
    },
    output: {
      nameKey: 'outputName',
      typeKey: 'outputType',
      defaultTypes: ['Text', 'Image'],
      namePrefix: 'output_'
    },
    text: {
      textKey: 'text',
      defaultText: '{{input}}'
    },
    llm: {}
  }

  const config = stateConfig[nodeType] || {}

  const [dynamicState, setDynamicState] = useState(() => {
    const initialStates = {}

    if (config.nameKey) {
      initialStates[config.nameKey] =
        data?.[config.nameKey] ||
        id.replace(`custom${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}-`, config.namePrefix)
    }

    if (config.typeKey) {
      initialStates[config.typeKey] =
        data?.[config.typeKey] ||
        (config.defaultTypes ? config.defaultTypes[0] : '')
    }

    if (config.textKey) {
      initialStates[config.textKey] =
        data?.[config.textKey] ||
        config.defaultText
    }

    return { ...initialStates, ...initialState }
  })

  const [nodeSize, setNodeSize] = useState({ width: 300, height: 'auto' })

  useEffect(() => {
    if (onNodeResize) {
      onNodeResize(id, nodeSize.width, nodeSize.height)
    }
  }, [nodeSize, onNodeResize, id])

  const handleSizeChange = (width, height) => {
    setNodeSize({ width, height })
  }

  const handleStateChange = (key) => (e) => {
    setDynamicState(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const renderHandles = () => {
    const handleComponents = []

    if (handles.target) {
      handleComponents.push(
        <Handle
          key="target"
          type="target"
          position={handles.target.position}
          id={`${id}-${handles.target.id}`}
          style={{
            width: 8,
            height: 8,
            background: "white",
            border: "1px solid black",               
          }}
        />
      )
    }

    if (handles.source) {
      handleComponents.push(
        <Handle
          key="source"
          type="source"
          position={handles.source.position}
          id={`${id}-${handles.source.id}`}
          style={{
            width: 8,
            height: 8,
            background: "white",
            border: "1px solid gray",               
          }}
         
        />
      )
    }

    return handleComponents
  }

  const getNodeIcon = () => {
    switch (nodeType) {
      case 'input':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        )
      case 'output':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="7 13 12 18 17 13" />
            <polyline points="7 6 12 11 17 6" />
          </svg>
        )
      case 'text':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        )
      case 'llm':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M20 12a8 8 0 1 0-16 0" />
            <path d="M12 12v10" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <Card className="min-w-[200px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-xl border shadow-md">
      {renderHandles()}
      <div className="flex items-center justify-between p-3 border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4">
            {getNodeIcon()}
          </div>
          {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <Info className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <X className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        {renderContent({
          dynamicState,
          handleStateChange,
          handleSizeChange
        })}
      </div>
    </Card>
  )
}

