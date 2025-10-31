import React from "react";

export const DependencyLine: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
}> = ({ from, to }) => (
  <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
      </marker>
    </defs>
    <path
      d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
      stroke="#94a3b8"
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead)"
    />
  </svg>
);
