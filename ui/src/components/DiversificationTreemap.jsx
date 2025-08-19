import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { portfolioData } from '../data/portfolioData';

function DiversificationTreemap() {
  const treemapData = portfolioData.map((item, index) => ({
    name: item.symbol,
    currency: item.currency,
    weight: item.weight,
    size: item.weight * 100,
    value: item.totalInvestedUSD,
    profitLoss: item.profitLossUSD,
    color: getColor(index)
  }));

  function getColor(index) {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', 
      '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e',
      '#55a3ff', '#26de81'
    ];
    return colors[index % colors.length];
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-dark p-4 rounded-xl shadow-luxury">
          <p className="text-white font-bold text-lg">{data.currency}</p>
          <p className="text-blue-300 font-semibold">{data.name}</p>
          <p className="text-white">Weight: <span className="font-bold">{data.size.toFixed(1)}%</span></p>
          <p className="text-white">Investment: <span className="font-bold">${data.value.toLocaleString()}</span></p>
          <p className={`font-bold ${data.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            P&L: ${data.profitLoss.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderTreemapContent = (props) => {
    const { x, y, width, height, payload } = props;
    if (width < 20 || height < 20) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={payload.color}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={2}
          rx={8}
        />
        {width > 60 && height > 40 && (
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="white"
            fontSize={Math.min(width / 6, height / 6, 14)}
            fontWeight="bold"
            className="drop-shadow-md"
          >
            {payload.name}
          </text>
        )}
        {width > 80 && height > 60 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.9)"
            fontSize={Math.min(width / 8, height / 8, 12)}
            fontWeight="600"
          >
            {payload.size.toFixed(0)}%
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="glass shadow-luxury rounded-2xl p-6 animate-slide-in-right h-full">
      <div className="flex items-center justify-center mb-4">
        <h3 className="text-xl font-bold text-white">Diversification</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-500 ml-3 rounded-full"></div>
      </div>
      
      <div className="h-80">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
          <Treemap
            width={780}
            height={250}
            data={treemapData}
            dataKey="size"
            ratio={4/3}
            stroke="rgba(255,255,255,0.2)"
            // content={renderTreemapContent}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default DiversificationTreemap;