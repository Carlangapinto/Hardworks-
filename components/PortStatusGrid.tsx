
import React from 'react';
import { useNetworkState } from '../context/NetworkStateContext';

interface PortStatusGridProps {
  nodeId: string;
  nodeLabel?: string;
  title?: string;
}

export const PortStatusGrid: React.FC<PortStatusGridProps> = ({ nodeId, nodeLabel, title }) => {
  // Access global state
  const { gridStates, togglePortStatus } = useNetworkState();
  
  // Get specific state for this grid (or empty object if none)
  const portStatuses = gridStates[nodeId] || {};

  const renderPortButton = (id: number) => {
    const status = portStatuses[id] || 'UNKNOWN';
    
    let styles = "border-gray-700 text-gray-600 hover:border-gray-500 hover:text-gray-400"; // Default UNKNOWN
    let label = "---";

    if (status === 'BUENO') {
      styles = "bg-green-900/30 border-green-500 text-green-400 font-bold shadow-[0_0_5px_rgba(0,255,0,0.3)]";
      label = "BUENO";
    } else if (status === 'MALO') {
      styles = "bg-red-900/30 border-red-500 text-red-500 font-bold shadow-[0_0_5px_rgba(255,0,0,0.3)]";
      label = "MALO";
    } else if (status === 'EN_USO') {
      styles = "bg-yellow-900/30 border-yellow-500 text-yellow-400 font-bold shadow-[0_0_5px_rgba(255,255,0,0.3)]";
      label = "EN USO";
    }

    return (
      <button
        key={id}
        onClick={() => togglePortStatus(nodeId, id)}
        className={`
          relative flex flex-col items-center justify-center h-12 border 
          transition-all duration-150 select-none text-[10px] font-mono group
          ${styles}
        `}
      >
        <span className="absolute top-0.5 left-1 text-[8px] opacity-70 font-mono">{id.toString().padStart(2, '0')}</span>
        <span className="text-[9px] tracking-wider">{label}</span>
      </button>
    );
  };

  // Determine display title
  const displayTitle = title || `${nodeLabel || nodeId} - PATCH PANEL STATUS`;

  return (
    <div className="w-full p-4 bg-[#0a0a0a] border border-[#333] mt-2">
       {/* Header Label */}
       <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
         <div className="border border-white p-1 inline-block bg-white text-black font-mono text-[10px] font-bold px-2">
            {displayTitle}
         </div>
         <div className="text-[10px] text-gray-400 font-mono">
            CLICK PORT TO TOGGLE
         </div>
       </div>

       {/* Grid Container 1-48 */}
       <div className="grid grid-cols-12 gap-1 w-full">
          {Array.from({ length: 48 }, (_, i) => i + 1).map((id) => renderPortButton(id))}
       </div>

       {/* Legend / Footer */}
       <div className="mt-4 flex justify-between items-end text-[10px] font-mono text-gray-500">
         <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-green-500 bg-green-900/30"></div>
                <span>BUENO</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-red-500 bg-red-900/30"></div>
                <span>MALO</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-yellow-500 bg-yellow-900/30"></div>
                <span>EN USO</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-gray-700"></div>
                <span>N/A</span>
            </div>
         </div>
         <div>ID: {nodeId}-PP</div>
       </div>
    </div>
  );
};
