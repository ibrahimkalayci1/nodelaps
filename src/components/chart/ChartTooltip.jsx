import React from 'react';

/**
 * Chart Tooltip Component
 * Displays detailed information when hovering over chart data points
 */
const ChartTooltip = ({ x, y, data, visible }) => {
  if (!visible || !data) return null;

  return (
    <g>
      {/* Tooltip Background */}
      <foreignObject
        x={x - 80}
        y={y - 80}
        width="160"
        height="70"
        className="pointer-events-none"
      >
        <div className="bg-[#1A1D1F] text-white rounded-lg p-3 shadow-lg">
          <div className="text-xs text-white/70 mb-1" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            {data.date}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span className="text-xs text-white" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Income: ${data.income?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24]"></span>
            <span className="text-xs text-white" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Expenses: ${data.expenses?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
            </span>
          </div>
        </div>
      </foreignObject>
      
      {/* Tooltip Arrow */}
      <polygon
        points={`${x},${y - 10} ${x - 8},${y - 2} ${x + 8},${y - 2}`}
        fill="#1A1D1F"
      />
    </g>
  );
};

export default ChartTooltip;
