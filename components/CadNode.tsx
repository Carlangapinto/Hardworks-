
import React from 'react';
import { NodeData, CadColor } from '../types';

interface CadNodeProps {
  node: NodeData;
  onClick: (node: NodeData) => void;
}

export const CadNode: React.FC<CadNodeProps> = ({ node, onClick }) => {
  const width = node.width || 100;
  const height = node.height || 50;
  
  // Calculate text color based on type
  const textColor = node.type === 'primary' ? CadColor.MAGENTA : 
                    node.type === 'secondary' ? CadColor.MAGENTA : CadColor.CYAN;

  return (
    <g 
      transform={`translate(${node.x}, ${node.y})`} 
      className="cursor-pointer hover:opacity-80 transition-opacity"
      onClick={(e) => {
        e.stopPropagation();
        onClick(node);
      }}
    >
      {/* Shadow/Glow effect for CAD look */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#000"
        stroke={CadColor.WHITE}
        strokeWidth="2"
        fillOpacity="0.6"
      />
      
      {/* Inner Corner Accents (Technical feel) */}
      <path d={`M 0,10 L 0,0 L 10,0`} fill="none" stroke={CadColor.WHITE} strokeWidth="1" />
      <path d={`M ${width-10},0 L ${width},0 L ${width},10`} fill="none" stroke={CadColor.WHITE} strokeWidth="1" />
      <path d={`M ${width},${height-10} L ${width},${height} L ${width-10},${height}`} fill="none" stroke={CadColor.WHITE} strokeWidth="1" />
      <path d={`M 10,${height} L 0,${height} L 0,${height-10}`} fill="none" stroke={CadColor.WHITE} strokeWidth="1" />

      {/* Text Label */}
      <text
        x={width / 2}
        y={height / 2}
        dy=".35em"
        textAnchor="middle"
        fill={textColor}
        fontFamily="'JetBrains Mono', monospace"
        fontSize="18"
        fontWeight="bold"
        style={{ letterSpacing: '1px' }}
      >
        {node.label}
      </text>
      
      {/* Connector Anchor Points Visualization (Decoration) */}
      <circle cx={width/2} cy={0} r={2} fill={CadColor.RED} />
      <circle cx={width/2} cy={height} r={2} fill={CadColor.RED} />
      <circle cx={0} cy={height/2} r={2} fill={CadColor.RED} />
      <circle cx={width} cy={height/2} r={2} fill={CadColor.RED} />
    </g>
  );
};
