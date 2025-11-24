
import React, { useState } from 'react';
import { CadColor } from '../types';

type PortStatus = 'BUENO' | 'MALO' | 'UNKNOWN';

export const RackView: React.FC = () => {
  // State to track status of ports across all panels
  // Key format: "PANEL_LABEL-PORT_INDEX"
  const [portStatuses, setPortStatuses] = useState<Record<string, PortStatus>>({});

  const toggleStatus = (id: string) => {
    setPortStatuses((prev) => {
      const current = prev[id] || 'UNKNOWN';
      let next: PortStatus = 'UNKNOWN';
      if (current === 'UNKNOWN') next = 'BUENO';
      else if (current === 'BUENO') next = 'MALO';
      else next = 'UNKNOWN';
      return { ...prev, [id]: next };
    });
  };

  // Helper to draw a generic patch panel / ODF
  const renderPatchPanel = (y: number, label: string, connectedPorts: number[]) => (
    <g transform={`translate(0, ${y})`}>
      {/* Panel Faceplate */}
      <rect x="10" y="0" width="280" height="40" fill="#1a1a1a" stroke={CadColor.GRAY} strokeWidth="1" />
      
      {/* Mounting Ears */}
      <rect x="0" y="0" width="10" height="40" fill="#111" stroke={CadColor.GRAY} strokeWidth="1" />
      <circle cx="5" cy="5" r="2" fill="#333" />
      <circle cx="5" cy="35" r="2" fill="#333" />
      <rect x="290" y="0" width="10" height="40" fill="#111" stroke={CadColor.GRAY} strokeWidth="1" />
      <circle cx="295" cy="5" r="2" fill="#333" />
      <circle cx="295" cy="35" r="2" fill="#333" />

      {/* Label Area */}
      <rect x="200" y="10" width="80" height="20" fill="#000" stroke="#333" />
      <text x="240" y="24" textAnchor="middle" fill={CadColor.WHITE} fontSize="8" fontFamily="'JetBrains Mono', monospace">{label}</text>

      {/* Ports (12 ports for visual clarity) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const id = `${label}-${i}`;
        const isConnected = connectedPorts.includes(i);
        const status = portStatuses[id] || 'UNKNOWN';
        const cx = 25 + i * 14;
        
        // Determine visual style based on status
        let portFill = isConnected ? "#111" : "#000";
        let portStroke = isConnected ? CadColor.YELLOW : "#333";
        let glowFilter = "";

        if (status === 'BUENO') {
            portFill = "rgba(0, 255, 0, 0.2)"; 
            portStroke = CadColor.GREEN;
        } else if (status === 'MALO') {
            portFill = "rgba(255, 0, 0, 0.2)";
            portStroke = CadColor.RED;
        }

        return (
          <g key={i} onClick={(e) => { e.stopPropagation(); toggleStatus(id); }} className="cursor-pointer hover:opacity-80">
             {/* Invisible Hit Area for easier clicking */}
             <rect x={cx-2} y="5" width="14" height="30" fill="transparent" />

             {/* Top Port (Fiber) */}
             <rect x={cx} y="8" width="10" height="10" fill={portFill} stroke={portStroke} strokeWidth="1" />
             
             {/* Bottom Port (Coupler/Spare) */}
             <rect x={cx} y="22" width="10" height="10" fill="#000" stroke="#333" strokeWidth="1" />
             
             {/* Status Text Indicator */}
             {(status !== 'UNKNOWN') && (
                 <text 
                    x={cx+5} 
                    y="38" 
                    textAnchor="middle" 
                    fontSize="6" 
                    fill={status === 'BUENO' ? CadColor.GREEN : CadColor.RED} 
                    fontWeight="bold"
                 >
                    {status === 'BUENO' ? 'OK' : 'X'}
                 </text>
             )}

             {/* Yellow Fiber Cables hanging down if connected */}
             {isConnected && (
                <path 
                    d={`M ${cx+5},13 C ${cx+5},30 ${cx-5 + (Math.random()*20)},50 -20,${100 + (Math.random()*100)}`} 
                    stroke={status === 'MALO' ? CadColor.RED : CadColor.YELLOW} 
                    strokeWidth="1.5" 
                    fill="none" 
                    opacity={status === 'MALO' ? 0.5 : 0.8}
                    className="pointer-events-none"
                />
             )}
          </g>
        );
      })}
    </g>
  );

  // Helper to render the switch
  const renderSwitch = (y: number) => (
    <g transform={`translate(0, ${y})`}>
       {/* Switch Body */}
       <rect x="10" y="0" width="280" height="45" fill="#0f0f0f" stroke={CadColor.CYAN} strokeWidth="1" />
       {/* Ears */}
       <rect x="0" y="0" width="10" height="45" fill="#111" stroke={CadColor.GRAY} strokeWidth="1" />
       <rect x="290" y="0" width="10" height="45" fill="#111" stroke={CadColor.GRAY} strokeWidth="1" />
       
       {/* Logo Area */}
       <text x="20" y="15" fill={CadColor.CYAN} fontSize="8" fontWeight="bold">CISCO</text>
       
       {/* Port Block 1 */}
       {Array.from({ length: 24 }).map((_, i) => {
         const id = `SWITCH-${i}`;
         const cx = 50 + i * 9;
         // Randomize active ports for visual effect similar to photo
         const isActive = [1,2,3,4,5,6,8,10,12,14,15,16,20,21].includes(i);
         const status = portStatuses[id] || 'UNKNOWN';
         
         let fill = isActive ? CadColor.CYAN : "#000";
         let stroke = "#333";

         if (status === 'BUENO') {
            fill = CadColor.GREEN;
         } else if (status === 'MALO') {
            fill = CadColor.RED;
         }

         return (
            <g key={i} onClick={(e) => { e.stopPropagation(); toggleStatus(id); }} className="cursor-pointer">
                <rect x={cx-1} y="18" width="8" height="20" fill="transparent" /> {/* Hit area */}
                
                <rect x={cx} y="20" width="6" height="6" fill={fill} stroke={stroke} strokeWidth="0.5" />
                <rect x={cx} y="30" width="6" height="6" fill={fill} stroke={stroke} strokeWidth="0.5" />
                
                {/* Blue Patch Cables */}
                {isActive && status !== 'MALO' && (
                    <path 
                        d={`M ${cx+3},23 C ${cx+3},60 ${cx+10},80 ${150 + (Math.random()*20)},150`}
                        stroke="#0099ff"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.7"
                        className="pointer-events-none"
                    />
                )}
            </g>
         )
       })}
    </g>
  );

  return (
    <div className="w-full p-4 bg-[#0a0a0a] border border-[#333] mt-4 select-none">
      <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
        <h4 className="text-xs font-mono text-gray-400">
            RACK LAYOUT - INTERACTIVE VIEW
        </h4>
        <div className="flex gap-2 text-[8px] font-mono">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-900 border border-green-500"></div> BUENO</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-900 border border-red-500"></div> MALO</span>
        </div>
      </div>

      <svg viewBox="-30 -10 360 350" className="w-full h-auto">
        <defs>
            <pattern id="rack-rail" width="10" height="20" patternUnits="userSpaceOnUse">
                <rect width="10" height="20" fill="#1a1a1a" />
                <circle cx="5" cy="10" r="1.5" fill="#444" />
            </pattern>
        </defs>

        {/* Rack Rails */}
        <rect x="0" y="0" width="10" height="320" fill="url(#rack-rail)" stroke="#333" />
        <rect x="290" y="0" width="10" height="320" fill="url(#rack-rail)" stroke="#333" />

        {/* Unit 1: SDP Tie (Top in photo) */}
        {renderPatchPanel(10, "LINK SDP", [0, 1, 2, 3, 4, 5])}

        {/* Unit 2: Generic/Spare */}
        {renderPatchPanel(55, "TRUENET RES", [0, 1])}

        {/* Unit 3: SE-02 Tie */}
        {renderPatchPanel(100, "LINK SE-02", [0, 1, 2, 3])}

        {/* Unit 4: Lab Quimico */}
        {renderPatchPanel(145, "LAB QUIMICO", [0, 1, 2, 4, 6])}

        {/* Unit 5: Molienda (implied from photo) */}
        {renderPatchPanel(190, "MOLIENDA", [0, 2, 4])}

        {/* Gap */}

        {/* Unit 6: Switch */}
        {renderSwitch(250)}

        {/* Cable Organizer (Visual indication of messy cables entering a duct) */}
        <path d="M -20,100 Q -10,200 -20,300" stroke="#222" strokeWidth="40" fill="none" />
        
      </svg>
      <div className="text-[10px] font-mono text-gray-500 mt-1 text-center">
        CLICK PORTS TO TOGGLE STATUS
      </div>
    </div>
  );
};
