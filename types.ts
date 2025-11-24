
export interface Coordinate {
  x: number;
  y: number;
}

export interface NodeData {
  id: string;
  label: string;
  fullLabel?: string;
  description?: string;
  type: 'primary' | 'secondary' | 'electrical';
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface ConnectionPath {
  id: string;
  d: string; // SVG path data
  color: string;
  dashed?: boolean;
  arrowEnd?: boolean;
  arrowStart?: boolean;
}

export enum CadColor {
  CYAN = '#00FFFF',
  GREEN = '#00FF00',
  YELLOW = '#FFFF00',
  MAGENTA = '#FF00FF',
  WHITE = '#FFFFFF',
  RED = '#FF0000',
  GRAY = '#404040',
  DARK_BG = '#121212',
  GRID = '#1f1f1f'
}

export type PortStatus = 'BUENO' | 'MALO' | 'EN_USO' | 'UNKNOWN';
