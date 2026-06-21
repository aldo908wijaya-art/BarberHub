import React, { useState } from "react";

interface ChartProps {
  type: "trend" | "revenue" | "services" | "growth";
}

export default function AnalyticsCharts({ type }: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (type === "trend") {
    // Dynamic Booking Trend (Weekly Line Chart)
    const points = [
      { day: "Mon", count: 42 },
      { day: "Tue", count: 58 },
      { day: "Wed", count: 72 },
      { day: "Thu", count: 85 },
      { day: "Fri", count: 124 },
      { day: "Sat", count: 156 },
      { day: "Sun", count: 110 }
    ];

    const maxVal = 180;
    const width = 500;
    const height = 180;
    const padding = 30;

    const getX = (index: number) => {
      return padding + (index * (width - padding * 2)) / (points.length - 1);
    };

    const getY = (val: number) => {
      return height - padding - (val * (height - padding * 2)) / maxVal;
    };

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p.count)}`).join(" ");
    const areaD = `${pathD} L ${getX(points.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

    return (
      <div className="relative p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <h4 className="text-sm font-semibold text-neutral-400 mb-2">Weekly Booking Trend</h4>
        <div className="w-full overflow-x-auto">
          <svg className="w-full min-w-[320px]" viewBox={`0 0 ${width} ${height}`} fill="none">
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding + ratio * (height - padding * 2);
              const val = Math.round(maxVal - ratio * maxVal);
              return (
                <g key={i}>
                  <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#2D2D2D" strokeDasharray="3,3" />
                  <text x={10} y={y + 4} fill="#66)6" className="text-[10px] fill-neutral-500 font-mono">{val}</text>
                </g>
              );
            })}

            {/* Area under line */}
            <path d={areaD} fill="url(#goldGradient)" />

            {/* Line path */}
            <path d={pathD} stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data nodes */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={getX(i)}
                cy={getY(p.count)}
                r={hoveredIndex === i ? 6 : 4}
                fill={hoveredIndex === i ? "#FFFFFF" : "#D4AF37"}
                stroke="#121212"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}

            {/* Day labels */}
            {points.map((p, i) => (
              <text
                key={i}
                x={getX(i)}
                y={height - 8}
                textAnchor="middle"
                className="text-[10px] fill-neutral-400 font-medium font-sans"
              >
                {p.day}
              </text>
            ))}
          </svg>
        </div>
        
        {/* Hover interactive tooltip */}
        {hoveredIndex !== null && (
          <div className="absolute top-2 right-4 bg-neutral-800 border border-gold/40 rounded-md px-2 py-1 text-xs text-white">
            <span className="font-semibold text-gold">{points[hoveredIndex].day}</span>: {points[hoveredIndex].count} Bookings
          </div>
        )}
      </div>
    );
  }

  if (type === "revenue") {
    // Revenue bar chart
    const data = [
      { month: "Jan", amt: 45 },
      { month: "Feb", amt: 65 },
      { month: "Mar", amt: 85 },
      { month: "Apr", amt: 70 },
      { month: "May", amt: 110 },
      { month: "Jun", amt: 125 }
    ];

    return (
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <h4 className="text-sm font-semibold text-neutral-400 mb-4">Monthly Revenue in Million IDR</h4>
        <div className="flex items-end justify-between gap-4 h-36 pt-4 px-2">
          {data.map((item, index) => {
            const hPercent = (item.amt / 140) * 100;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full flex justify-center">
                  {isHovered && (
                    <div className="absolute -top-7 bg-neutral-800 text-gold text-[10px] px-1.5 py-0.5 rounded border border-gold/20 font-mono whitespace-nowrap">
                      Rp {item.amt}M
                    </div>
                  )}
                  <div
                    style={{ height: `${hPercent}%` }}
                    className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                      isHovered ? "bg-white shadow-[0_0_12px_rgba(212,175,55,0.4)]" : "bg-gradient-to-t from-gold-dark to-gold"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-neutral-400 mt-2 font-mono">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "services") {
    // Popular services breakdown (donut/pie visualization using stacked indicators or simplified SVG circle)
    const services = [
      { name: "Premium Royal Cut", prc: 55, color: "bg-gold" },
      { name: "Classic Beard & Shave", prc: 25, color: "bg-white" },
      { name: "Charcoal Face Mask", prc: 12, color: "bg-neutral-400" },
      { name: "The Executive treatment combo", prc: 8, color: "bg-yellow-600" }
    ];

    return (
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <h4 className="text-sm font-semibold text-neutral-400 mb-3">Popular Grooming Services</h4>
        <div className="space-y-4">
          <div className="h-4 w-full bg-neutral-800 rounded-full flex overflow-hidden">
            {services.map((s, idx) => (
              <div
                key={idx}
                style={{ width: `${s.prc}%` }}
                className={`${s.color} h-full first:rounded-l-full last:rounded-r-full hover:opacity-90 transition-all`}
                title={`${s.name}: ${s.prc}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {services.map((s, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${s.color}`} />
                <span className="text-xs text-neutral-300 truncate max-w-[120px]">{s.name}</span>
                <span className="text-xs text-neutral-500 font-mono">({s.prc}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // default growth line/stats representation
  return (
    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
      <h4 className="text-sm font-semibold text-neutral-400 mb-3">Customer Growth Velocity</h4>
      <div className="flex items-baseline space-x-2 mb-2">
        <span className="text-3xl font-bold text-white font-display">14,208</span>
        <span className="text-xs text-green-500 font-semibold font-mono">▲ +24% this week</span>
      </div>
      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-gold h-full rounded-full" style={{ width: "78%" }} />
      </div>
      <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-500">
        <span>Active Retention Rate: 92%</span>
        <span>Goal: 15,000</span>
      </div>
    </div>
  );
}
