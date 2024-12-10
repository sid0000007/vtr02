
import { ReactFlowProvider } from '@xyflow/react';
import { useStore } from './store';
import { Button } from './components/ui/button';
import { toast, ToastContainer } from 'react-toastify';

const SubmitButtonContent = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      console.log('Nodes length:', nodes?.length);
      console.log('Edges length:', edges?.length);
      console.log('Detailed Nodes:', nodes);
      console.log('Detailed Edges:', edges);

      // Only proceed if we actually have nodes or edges
      if (!nodes?.length && !edges?.length) {
        alert('No nodes or edges found in the flow. Please create some nodes and connections first.');
        return;
      }

      // Serialize nodes and edges
      const serializedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      }));

      const serializedEdges = edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }));

      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: serializedNodes,
          edges: serializedEdges
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(`The pipeline has ${data.num_nodes} nodes, ${data.num_edges} edges, and is a DAG: ${data.is_dag}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting pipeline: ' + error.message);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <Button className=' my-7 rounded-md text-black bg-white' variant="secondary" onClick={handleSubmit} >Submit Pipeline</Button>
    </div>
  );
};

export const SubmitButton = () => {
  return <ReactFlowProvider><SubmitButtonContent /></ReactFlowProvider>;
};