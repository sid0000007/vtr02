import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from '@xyflow/react';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // Initialize nodeIDs object
  
  // Unique node ID generation
  getNodeID: (type) => {
    const newIDs = {...get().nodeIDs};
    
    // Ensure type is initialized
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    
    // Increment and create unique ID
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    
    return `custom${type.charAt(0).toUpperCase() + type.slice(1)}-${newIDs[type]}`;
  },
  
  // Add a new node
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  
  // Handle node changes
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  // Handle edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  // Handle new connections
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: 20,
            width: 20
          }
        },
        get().edges
      ),
    });
  },
  
  // Update a specific field in a node's data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { 
              ...node.data, 
              [fieldName]: fieldValue 
            }
          };
        }
        return node;
      }),
    });
  },
}));

// Optional: Create a provider component if needed
export const StoreProvider = ({ children }) => {
  return children;
};