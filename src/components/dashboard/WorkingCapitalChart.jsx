import React, { useState } from 'react';
import ChartTooltip from '../chart/ChartTooltip';
import { formatDate } from '../../utils/formatters';
import { SkeletonChart } from '../skeleton/SkeletonCard';

/**
 * Working Capital Chart Component
 * Displays income and expenses as a line chart with tooltip support
 */
const WorkingCapitalChart = ({ workingCapital, loading }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const workingCapitalData = workingCapital?.data || (Array.isArray(workingCapital) ? workingCapital : []);

  const chartData = workingCapitalData.length > 0
    ? workingCapitalData.slice(-7).map((item) => ({
        date: formatDate(item.date || new Date(), 'en-US', { month: 'short', day: 'numeric' }),
        income: item.income || 0,
        expenses: Math.abs(item.expenses || 0),
        rawDate: item.date
      }))
    : [
        { date: 'Apr 14', income: 3000, expenses: 2500 },
        { date: 'Apr 15', income: 3500, expenses: 2800 },
        { date: 'Apr 16', income: 4000, expenses: 3000 },
        { date: 'Apr 17', income: 5500, expenses: 3200 },
        { date: 'Apr 18', income: 5000, expenses: 3500 },
        { date: 'Apr 19', income: 6000, expenses: 3800 },
        { date: 'Apr 20', income: 6500, expenses: 4000 }
      ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expenses)), 1000);
  const chartWidth = 700;

  const handlePointHover = (event, data, index) => {
    const svgElement = event.currentTarget.closest('svg');
    if (!svgElement) return;
    
    const svgRect = svgElement.getBoundingClientRect();
    const containerRect = svgElement.closest('.relative')?.getBoundingClientRect() || svgRect;
    
    const x = 40 + index * ((chartWidth - 60) / (chartData.length - 1));
    const y = 240 - (Math.max(data.income, data.expenses) / maxValue) * 180;
    
    // Calculate position relative to container
    const xPercent = (x / chartWidth) * 100;
    const yPercent = (y / 280) * 100;
    
    setHoveredPoint(data);
    setHoverPosition({ 
      x: xPercent, 
      y: yPercent,
      clientX: svgRect.left + (x / chartWidth) * svgRect.width,
      clientY: svgRect.top + (y / 280) * svgRect.height
    });
  };

  const handlePointLeave = () => {
    // Add slight delay for smoother UX when moving between points
    setTimeout(() => {
      setHoveredPoint(null);
    }, 100);
  };

  if (loading) {
    return <SkeletonChart />;
  }

  return (
    <div className="bg-white p-6 lg:p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
        <h2 className="text-lg lg:text-[18px] font-bold text-[#1A1D1F]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          Working Capital
        </h2>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span className="text-xs text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>Income</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FBBF24]"></span>
            <span className="text-xs text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>Expenses</span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-[#F4F4F4] text-xs font-semibold px-4 py-2 pr-8 rounded-lg cursor-pointer outline-none text-[#6F767E]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#6F767E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[280px] lg:h-[320px] w-full relative">
        <svg width="100%" height="280" viewBox={`0 0 ${chartWidth} 280`} preserveAspectRatio="none">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
            <line
              key={i}
              x1="40"
              y1={40 + (1 - v) * 200}
              x2={chartWidth - 20}
              y2={40 + (1 - v) * 200}
              stroke="#F4F4F4"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[0, 3000, 5000, 7000, 10000].map((val, i) => (
            <text key={i} x="0" y={240 - (val/10000)*200 + 5} fontSize="10" fill="#9A9FA5">
              {val === 0 ? '0K' : `${val/1000}K`}
            </text>
          ))}

          {/* Data Lines */}
          <path
            d={chartData.map((d, i) => {
              const x = 40 + i * ((chartWidth - 60) / (chartData.length - 1));
              const y = 240 - (d.income / maxValue) * 180;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
          />
          <path
            d={chartData.map((d, i) => {
              const x = 40 + i * ((chartWidth - 60) / (chartData.length - 1));
              const y = 240 - (d.expenses / maxValue) * 180;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2.5"
          />
          
          {/* Data Points with Hover */}
          {chartData.map((d, i) => {
            const x = 40 + i * ((chartWidth - 60) / (chartData.length - 1));
            const incomeY = 240 - (d.income / maxValue) * 180;
            const expensesY = 240 - (d.expenses / maxValue) * 180;
            const maxY = Math.min(incomeY, expensesY);

            return (
              <g key={i}>
                {/* Income Point */}
                <circle
                  cx={x}
                  cy={incomeY}
                  r="4"
                  fill="#10B981"
                  className="cursor-pointer transition-all duration-200 hover:r-6 hover:opacity-80"
                  onMouseEnter={(e) => handlePointHover(e, d, i)}
                  onMouseLeave={handlePointLeave}
                />
                {/* Expenses Point */}
                <circle
                  cx={x}
                  cy={expensesY}
                  r="4"
                  fill="#FBBF24"
                  className="cursor-pointer transition-all duration-200 hover:r-6 hover:opacity-80"
                  onMouseEnter={(e) => handlePointHover(e, d, i)}
                  onMouseLeave={handlePointLeave}
                />
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {chartData.map((d, i) => (
            <text 
              key={i} 
              x={40 + i * ((chartWidth - 60) / (chartData.length - 1))} 
              y="270" 
              fontSize="10" 
              fill="#9A9FA5" 
              textAnchor="middle"
            >
              {d.date}
            </text>
          ))}
        </svg>
        
        {/* Tooltip */}
        {hoveredPoint && hoverPosition.clientX && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${hoverPosition.clientX}px`,
              top: `${hoverPosition.clientY - 80}px`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="bg-[#1A1D1F] text-white rounded-lg p-3 shadow-lg min-w-[160px] animate-fade-in">
              <div className="text-xs text-white/70 mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                {hoveredPoint.date}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></span>
                <span className="text-xs text-white" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Income: ${hoveredPoint.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FBBF24] shrink-0"></span>
                <span className="text-xs text-white" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Expenses: ${hoveredPoint.expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkingCapitalChart;
