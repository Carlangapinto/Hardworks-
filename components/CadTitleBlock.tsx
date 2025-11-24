import React from 'react';
import { CadColor } from '../types';

export const CadTitleBlock: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 border-2 border-white bg-black/90 p-0 w-80 shadow-lg pointer-events-none select-none">
      <div className="grid grid-cols-1 divide-y-2 divide-white">
        <div className="p-2">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Project</div>
          <div className="text-xl font-bold text-cyan-300 font-mono">Molyb 2025</div>
        </div>
        <div className="p-2">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest">Title</div>
          <div className="text-sm font-bold text-white font-mono leading-tight">
            DIAGRAMA RED<br/>CONEXION F.O. FISICA
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x-2 divide-white">
            <div className="p-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Date</div>
                <div className="text-sm text-yellow-300 font-mono">21-11-2025</div>
            </div>
            <div className="p-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Rev</div>
                <div className="text-sm text-green-400 font-mono">1.0 A</div>
            </div>
        </div>
      </div>
    </div>
  );
};