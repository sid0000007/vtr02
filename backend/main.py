
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headerss
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: PipelineData):
    # Count nodes and edges
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    print("Received Nodes:", pipeline.nodes)
    print("Received Edges:", pipeline.edges)
    
    # Create directed graph
    G = nx.DiGraph()
    
    # Add nodes
    for node in pipeline.nodes:
        G.add_node(node['id'])
    
    # Add edges
    for edge in pipeline.edges:
        G.add_edge(edge['source'], edge['target'])
    
    # Check if it's a DAG
    is_dag = nx.is_directed_acyclic_graph(G)
    print("Is DAG:", is_dag)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

