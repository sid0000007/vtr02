import React from 'react';
import { ReactFlowProvider} from '@xyflow/react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import '@xyflow/react/dist/style.css';
import { useStore } from './store';
import './index.css';

function Flow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore();

  return (
    <div>
      {/* <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
      </ReactFlow> */}
    </div>
  );
}

function App() {
  return (
    <>
       <PipelineToolbar/>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
      <PipelineUI />


    </>
  );
}

export default App;