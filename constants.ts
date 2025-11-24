
import { CadColor, NodeData } from './types';

// Diagram Scale
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 700;
export const GRID_SIZE = 25;

// Node Definitions based on the hand-drawn image
export const NODES: NodeData[] = [
  {
    id: 'SDP',
    label: 'SDP',
    fullLabel: 'SALA DATOS PRINCIPAL',
    description: 'Rack de red Molyb',
    type: 'primary',
    x: 300,
    y: 50,
  },
  {
    id: 'SE-05',
    label: 'SE-05',
    fullLabel: 'SALA ELECTRICA 05',
    // Description removed as requested
    type: 'electrical',
    x: 300,
    y: 200,
  },
  {
    id: 'SE-02',
    label: 'SE-02',
    fullLabel: 'SALA ELECTRICA 02',
    description: 'Rack de Comunicaciones - Anillo Oeste',
    type: 'electrical',
    x: 100,
    y: 350,
  },
  {
    id: 'SE-01',
    label: 'SE-01',
    fullLabel: 'SALA ELECTRICA 01',
    description: 'Tablero de Fibra Óptica - Distribución',
    type: 'electrical',
    x: 600,
    y: 250,
  },
  {
    id: 'SDS',
    label: 'SDS',
    fullLabel: 'SALA DATOS SECUNDARIA',
    description: 'Rack de Respaldo y Contingencia',
    type: 'secondary',
    x: 250,
    y: 550,
  },
  {
    id: 'SE-03',
    label: 'SE-03',
    fullLabel: 'SALA ELECTRICA 03',
    description: 'Nodo de Distribución Central',
    type: 'electrical',
    x: 450,
    y: 450,
  },
  {
    id: 'SE-04',
    label: 'SE-04',
    fullLabel: 'SALA ELECTRICA 04',
    description: 'Terminal de Fibra Óptica - Sur',
    type: 'electrical',
    x: 700,
    y: 450,
  },
];

// Helper to map diagram labels
export const LEGEND_ITEMS = [
  { code: 'SDP', desc: 'SALA DATOS PRINCIPAL' },
  { code: 'SDS', desc: 'SALA DATOS SECUNDARIA' },
  { code: 'SE', desc: 'SALA ELECTRICA' },
];
