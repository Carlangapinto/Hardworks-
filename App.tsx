
import React, { useRef } from 'react';
import { NetworkDiagram } from './components/NetworkDiagram';
import { CadTitleBlock } from './components/CadTitleBlock';
import { Legend } from './components/Legend';
import { NetworkStateProvider, useNetworkState } from './context/NetworkStateContext';
import { Laptop, Maximize2, Save, FolderOpen, RotateCcw } from 'lucide-react';

// Inner component to access context
const AppLayout: React.FC = () => {
  const { exportData, importData, resetData } = useNetworkState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
        {/* Hidden File Input for Import */}
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
        />

        {/* Top Toolbar (AutoCAD style ribbon simulation) */}
        <header className="h-12 bg-[#2b2b2b] border-b border-[#444] flex items-center px-4 justify-between select-none z-10">
          <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 text-white font-bold flex items-center justify-center text-xs rounded-sm shadow-sm">
                  A
              </div>
              <div className="flex flex-col">
                 <span className="text-gray-200 text-xs font-bold font-mono tracking-wide">Molyb Network Manager</span>
                 <span className="text-gray-500 text-[10px] font-mono">v1.0.0 Operational</span>
              </div>
          </div>
          
          <div className="flex items-center gap-2">
               {/* Operational Buttons */}
               <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded border border-[#333] mr-4">
                   <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[#333] px-2 py-1 rounded transition-colors text-xs font-mono"
                      title="Import Configuration"
                   >
                      <FolderOpen size={14} className="text-yellow-500" />
                      <span className="hidden sm:inline">OPEN</span>
                   </button>
                   <div className="w-[1px] h-4 bg-[#444]"></div>
                   <button 
                      onClick={exportData}
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[#333] px-2 py-1 rounded transition-colors text-xs font-mono"
                      title="Export Configuration"
                   >
                      <Save size={14} className="text-cyan-500" />
                      <span className="hidden sm:inline">SAVE</span>
                   </button>
               </div>

               <button 
                  onClick={resetData}
                  className="text-gray-500 hover:text-red-400 p-2 transition-colors"
                  title="Factory Reset"
               >
                   <RotateCcw size={14} />
               </button>

               <button className="flex items-center gap-2 text-gray-400 hover:text-white text-xs bg-[#3a3a3a] px-3 py-1 rounded transition-colors">
                  <Laptop size={14} />
                  <span>MODEL</span>
               </button>
               <button className="text-gray-400 hover:text-white">
                  <Maximize2 size={16} />
               </button>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 relative flex">
          {/* Left Tool Palette (Decorative) */}
          <div className="w-10 bg-[#2b2b2b] border-r border-[#444] flex flex-col items-center py-2 gap-3 hidden sm:flex">
              {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-6 border border-gray-600 hover:border-cyan-400 cursor-pointer opacity-50 hover:opacity-100 transition-all bg-[#1a1a1a]" />
              ))}
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative bg-[#0f0f0f]">
              <NetworkDiagram />
              
              {/* Overlays */}
              <Legend />
              <CadTitleBlock />
              
              {/* Coordinates Display (Decorative) */}
              <div className="absolute bottom-1 left-4 text-[10px] font-mono text-gray-500 pointer-events-none">
                  Coordinates: 4281.05, 2910.33, 0.00
              </div>
          </div>
        </main>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <NetworkStateProvider>
      <AppLayout />
    </NetworkStateProvider>
  );
};

export default App;
