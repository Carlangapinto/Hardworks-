import React from 'react';
import { LEGEND_ITEMS } from '../constants';
import { CadColor } from '../types';

export const Legend: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 bg-black/80 border border-gray-600 p-4 rounded-none shadow-xl backdrop-blur-sm">
      <h3 className="text-yellow-400 font-mono font-bold border-b border-gray-600 pb-2 mb-2 text-sm uppercase tracking-wider">
        Nomenclature
      </h3>
      <ul className="space-y-2">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.code} className="flex items-start gap-3 text-xs">
            <span className="font-bold text-cyan-300 w-8 shrink-0">{item.code}</span>
            <span className="text-gray-300">-</span>
            <span className="text-gray-200 font-mono">{item.desc}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-2 border-t border-gray-600">
         <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
            <div className="w-4 h-[2px] bg-cyan-400"></div>
            <span>Data Primary Path</span>
         </div>
         <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <div className="w-4 h-[2px] bg-green-400"></div>
            <span>Data Secondary Path</span>
         </div>
      </div>
    </div>
  );
};