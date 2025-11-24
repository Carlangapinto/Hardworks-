
import React, { useState } from 'react';
import { CadColor } from '../types';

type PortStatus = 'BUENO' | 'MALO' | 'UNKNOWN';

export const Se01PanelDiagram: React.FC = () => {
  // Initialize state with the specific data found in the photo
  // The rest will default to 'UNKNOWN'
  const [portStatuses, setPortStatuses] = useState<Record<number, PortStatus>>({
    4: 'MALO', 5: 'MALO', 6: 'MALO', 7: 'BUENO', 8: 'MALO', 9: 'BUENO', 10: 'BUENO', 11: 'BUENO', 12: 'BUENO',
    16: 'MALO', 17: 'MALO', 18: 'BUENO', 19: 'BUENO', 20: 'MALO', 21: 'BUENO', 22: 'BUENO', 23: 'BUENO', 24: 'BUENO'
  });

  const toggleStatus = (id: number) => {
    setPortStatuses((prev) => {
      const current = prev[id] || 'UNKNOWN';
      let next: PortStatus = 'UNKNOWN';

      // Cycle: UNKNOWN -> BUENO -> MALO -> UNKNOWN
      if (current === 'UNKNOWN') next = 'BUENO';
      else if (current === 'BUENO') next = 'MALO';
      else next = 'UNKNOWN';

      return { ...prev, [id]: next };
    });
  };

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
    }

    return (
      <button
        key={id}
        onClick={() => toggleStatus(id)}
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

  return (
    <div className="w-full p-4 bg-[#0a0a0a] border border-[#333] mt-2">
       {/* Header Label */}
       <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
         <div className="border border-white p-1 inline-block bg-white text-black font-mono text-[10px] font-bold px-2">
            SALA ELEC 01 - CONTROL PANEL
         </div>
         <div className="text-[10px] text-gray-400 font-mono">
            CLICK PORT TO TOGGLE STATUS
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
                <div className="w-3 h-3 border border-gray-700"></div>
                <span>N/A</span>
            </div>
         </div>
         <div>REF: IMG-20251121-WA0014</div>
       </div>
    </div>
  );
};
