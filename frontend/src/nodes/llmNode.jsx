

import React from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './baseNode';

export const LLMNode = (props) => {
  const renderContent = () => (
    <span>This is an LLM Node</span>
  );

  return (
    <BaseNode
      {...props}
      nodeType="llm"
      handles={{
        target: [
          { position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
          { position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } }
        ],
        source: { position: Position.Right, id: 'response' }
      }}
      renderContent={renderContent}
    />
  );
};