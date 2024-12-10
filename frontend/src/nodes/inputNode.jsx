'use client'

import { Position } from '@xyflow/react'
import { BaseNode } from './baseNode'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function InputNode(props) {
  const renderContent = ({ dynamicState, handleStateChange }) => (
    <Card className=" bg-white border-[#e5e7eb] shadow-sm">
      <div className="flex items-center justify-between p-3 border-b border-[#e5e7eb]">
        
        
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Name</label>
          <Input
            type="text"
            value={dynamicState.inputName}
            onChange={handleStateChange('inputName')}
            className="h-9 border-[#e5e7eb]"
            placeholder="subject"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Type</label>
          <Select value={dynamicState.inputType} onValueChange={(value) => handleStateChange('inputType')({ target: { value } })}>
            <SelectTrigger className="h-9 border-[#e5e7eb]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )

  return (
    <BaseNode
      {...props}
      nodeType="input"
      handles={{
        source: { position: Position.Right, id: 'value' }
      }}
      renderContent={renderContent}
    />
  )
}

