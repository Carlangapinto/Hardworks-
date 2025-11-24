
import React, { useMemo, useState } from 'react';
import { CadColor, ConnectionPath, NodeData } from '../types';
import { NODES, CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE } from '../constants';
import { CadNode } from './CadNode';
import { PortStatusGrid } from './PortStatusGrid';
import { X } from 'lucide-react';

export const NetworkDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Define paths manually to strictly match the hand-drawn diagram
  // Format: Orthogonal routing. 
  const connections: ConnectionPath[] = useMemo(() => [
    // SDP -> SE-05 (Top down)
    {
      id: 'c1',
      d: `M 350,100 L 350,200`, 
      color: CadColor.CYAN,
      arrowEnd: true,
      arrowStart: true
    },
    // SE-05 -> SE-01 (Right side branch)
    {
      id: 'c2',
      d: `M 400,225 L 650,225 L 650,250`, 
      color: CadColor.CYAN,
      arrowEnd: true,
      arrowStart: true
    },
    // SE-05 -> SE-02 (Left side branch)
    {
        id: 'c3',
        d: `M 300,225 L 150,225 L 150,350`,
        color: CadColor.CYAN,
        arrowEnd: true,
        arrowStart: true
    },
    // SE-01 -> SE-04 (Straight Down)
    {
        id: 'c4',
        d: `M 650,300 L 650,400 L 750,400 L 750,450`, // Offset slightly to enter top of SE-04 box properly
        color: CadColor.CYAN,
        arrowEnd: true,
        arrowStart: true
    },
    // SE-02 -> SE-03 (Right connection - Adjusted to enter Top Center)
    {
        id: 'c5',
        d: `M 200,375 L 500,375 L 500,450`,
        color: CadColor.CYAN,
        arrowEnd: true,
        arrowStart: true
    },
    // SDS -> SE-02 (Upwards)
    {
        id: 'c6',
        d: `M 250,575 L 150,575 L 150,400`, // From SDS bottom, left, then up to SE-02 bottom
        color: CadColor.GREEN,
        arrowEnd: true,
        arrowStart: true
    },
    // SDS -> SE-03 (Independent path - From Top of SDS)
    {
        id: 'c7',
        d: `M 300,550 L 300,525 L 500,525 L 500,500`, // From SDS Top, Up, Right, Up to SE-03 Bottom
        color: CadColor.GREEN,
        arrowEnd: true,
        arrowStart: true
    },
     // SDS -> SE-04 (Independent path - From Right of SDS)
     {
        id: 'c8',
        d: `M 350,575 L 750,575 L 750,500`, // From SDS Right, Right all the way, Up to SE-04
        color: CadColor.GREEN,
        arrowEnd: true,
        arrowStart: true
    },
    // SE-03 -> SE-04 (New Connection)
    {
        id: 'c9',
        d: `M 550,475 L 700,475`, // Straight line from SE-03 Right to SE-04 Left
        color: CadColor.CYAN,
        arrowEnd: true,
        arrowStart: true
    }
  ], []);

  // When any node is selected, we now show the large detail view because all nodes have the PortStatusGrid
  const isLargeDetail = !!selectedNode;

  return (
    <div className="w-full h-full overflow-auto relative bg-[#0f0f0f] border border-[#333]" onClick={() => setSelectedNode(null)}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="block"
      >
        <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke={CadColor.GRID} strokeWidth="1" />
            </pattern>
            {/* Arrow Marker - Cyan */}
            <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={CadColor.CYAN} />
            </marker>
             {/* Arrow Marker - Green */}
             <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={CadColor.GREEN} />
            </marker>
            
            {/* Arrow Marker - Cyan - Reverse (Start) */}
            <marker id="arrow-cyan-reverse" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={CadColor.CYAN} />
            </marker>
             {/* Arrow Marker - Green - Reverse (Start) */}
             <marker id="arrow-green-reverse" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill={CadColor.GREEN} />
            </marker>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        <g className="connections">
            {connections.map((conn) => (
                <path
                    key={conn.id}
                    d={conn.d}
                    stroke={conn.color}
                    strokeWidth="2"
                    fill="none"
                    markerStart={conn.arrowStart ? `url(#arrow-${conn.color === CadColor.GREEN ? 'green' : 'cyan'}-reverse)` : undefined}
                    markerEnd={conn.arrowEnd ? `url(#arrow-${conn.color === CadColor.GREEN ? 'green' : 'cyan'})` : undefined}
                    className="drop-shadow-[0_0_2px_rgba(0,255,255,0.5)]"
                />
            ))}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {NODES.map((node) => (
            <CadNode key={node.id} node={node} onClick={setSelectedNode} />
          ))}
        </g>
      </svg>

      {/* Property Dialog (AutoCAD Properties Style) */}
      {selectedNode && (
          <div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto bg-[#1c1c1c] border-2 border-[#444] shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 flex flex-col transition-all duration-300 ease-out ${isLargeDetail ? 'w-[800px] max-w-[95vw]' : 'w-96'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="bg-[#2b2b2b] px-2 py-1 flex justify-between items-center border-b border-[#444] sticky top-0 z-10">
                <span className="text-gray-300 text-xs font-bold font-mono uppercase tracking-wider">Properties</span>
                <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-white">
                    <X size={14} />
                </button>
            </div>
            
            {/* Dialog Content */}
            <div className="p-3 font-mono text-xs">
                <div className="grid grid-cols-[80px_1fr] gap-y-2 mb-4">
                    <div className="text-gray-500">OBJECT</div>
                    <div className="text-cyan-300 font-bold">{selectedNode.id}</div>
                    
                    <div className="text-gray-500">NAME</div>
                    <div className="text-white">{selectedNode.fullLabel || selectedNode.label}</div>
                    
                    <div className="text-gray-500">TYPE</div>
                    <div className="text-white uppercase">{selectedNode.type}</div>

                    {selectedNode.description && (
                        <>
                            <div className="text-gray-500">DESC</div>
                            <div className="text-yellow-300">{selectedNode.description}</div>
                        </>
                    )}
                    
                    <div className="text-gray-500">COORD</div>
                    <div className="text-gray-400">X:{selectedNode.x} Y:{selectedNode.y}</div>
                </div>

                {/* Generic Interactive Port Grid for ALL nodes */}
                <div className="mt-4 border-t border-gray-700 pt-2">
                    {/* 1. Primary Panel */}
                    <PortStatusGrid 
                      nodeId={selectedNode.id} 
                      nodeLabel={selectedNode.label} 
                      title={selectedNode.id === 'SE-05' ? "SE 05 A SE 01" : undefined}
                    />
                    
                    {/* 2. Secondary Panel for SE-05 specifically */}
                    {selectedNode.id === 'SE-05' && (
                        <div className="mt-8">
                             <PortStatusGrid nodeId="SE-05-LINK-SE02" title="SE 05 A SE 02" />
                        </div>
                    )}

                    {/* 3. Extra Panel 1 (All Nodes) */}
                    <div className="mt-8">
                         <PortStatusGrid 
                            nodeId={`${selectedNode.id}-EXTRA-01`} 
                            title={`${selectedNode.label} - PANEL RESERVA 01`} 
                        />
                    </div>

                    {/* 4. Extra Panel 2 (All Nodes) */}
                    <div className="mt-8">
                         <PortStatusGrid 
                            nodeId={`${selectedNode.id}-EXTRA-02`} 
                            title={`${selectedNode.label} - PANEL RESERVA 02`} 
                        />
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="bg-[#2b2b2b] p-2 border-t border-[#444] flex justify-end sticky bottom-0 z-10">
                <button 
                    className="bg-[#444] hover:bg-[#555] text-white px-3 py-1 text-[10px] uppercase tracking-wider transition-colors"
                    onClick={() => setSelectedNode(null)}
                >
                    OK
                </button>
            </div>
          </div>
      )}
    </div>
  );
};
