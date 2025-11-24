
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortStatus } from '../types';

interface NetworkState {
  // Map of GridID -> PortIndex -> Status
  gridStates: Record<string, Record<number, PortStatus>>;
  togglePortStatus: (gridId: string, portId: number) => void;
  exportData: () => void;
  importData: (file: File) => Promise<void>;
  resetData: () => void;
}

const NetworkStateContext = createContext<NetworkState | undefined>(undefined);

// Initial data for SE-01 as requested previously
const SE01_INITIAL_DATA: Record<number, PortStatus> = {
  4: 'MALO', 5: 'MALO', 6: 'MALO', 7: 'BUENO', 8: 'MALO', 9: 'BUENO', 10: 'BUENO', 11: 'BUENO', 12: 'BUENO',
  16: 'MALO', 17: 'MALO', 18: 'BUENO', 19: 'BUENO', 20: 'MALO', 21: 'BUENO', 22: 'BUENO', 23: 'BUENO', 24: 'BUENO'
};

const STORAGE_KEY = 'MOLYB_NETWORK_STATE_V1';

export const NetworkStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage if available, otherwise use defaults
  const [gridStates, setGridStates] = useState<Record<string, Record<number, PortStatus>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load from local storage", e);
    }
    // Default initial state
    return { 'SE-01': SE01_INITIAL_DATA };
  });

  // Persist to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gridStates));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  }, [gridStates]);

  const togglePortStatus = (gridId: string, portId: number) => {
    setGridStates((prev) => {
      const currentGrid = prev[gridId] || {};
      const currentStatus = currentGrid[portId] || 'UNKNOWN';
      
      let nextStatus: PortStatus = 'UNKNOWN';
      // Cycle: UNKNOWN -> BUENO -> MALO -> EN_USO -> UNKNOWN
      if (currentStatus === 'UNKNOWN') nextStatus = 'BUENO';
      else if (currentStatus === 'BUENO') nextStatus = 'MALO';
      else if (currentStatus === 'MALO') nextStatus = 'EN_USO';
      else nextStatus = 'UNKNOWN';

      return {
        ...prev,
        [gridId]: {
          ...currentGrid,
          [portId]: nextStatus
        }
      };
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(gridStates, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `molyb-network-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      // Basic validation
      if (typeof data === 'object' && data !== null) {
        setGridStates(data);
        alert("Configuration loaded successfully!");
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to import configuration. Check file format.");
    }
  };

  const resetData = () => {
    if (confirm("Are you sure you want to reset all data to default? This cannot be undone.")) {
       setGridStates({ 'SE-01': SE01_INITIAL_DATA });
    }
  };

  return (
    <NetworkStateContext.Provider value={{ gridStates, togglePortStatus, exportData, importData, resetData }}>
      {children}
    </NetworkStateContext.Provider>
  );
};

export const useNetworkState = () => {
  const context = useContext(NetworkStateContext);
  if (!context) {
    throw new Error('useNetworkState must be used within a NetworkStateProvider');
  }
  return context;
};
