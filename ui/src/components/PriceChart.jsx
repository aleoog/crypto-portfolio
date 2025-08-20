import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Datos simulados para el gráfico
const generateChartData = (days) => {
  const data = [];
  const basePrice = 43250;
  let currentPrice = basePrice;
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 0.1; // Variación del -5% al +5%
    currentPrice = currentPrice * (1 + change);
    
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice * 100) / 100,
      volume: Math.random() * 1000000000 + 500000000,
    });
  }
  return data;
};

const PriceChart = ({ title = "Bitcoin Price Chart" }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('price');

  const getChartData = () => {
    const days = {
      '1d': 24, // Horas para 1 día
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    };
    return generateChartData(days[timeRange] || 7);
  };

  const chartData = getChartData();

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatVolume = (value) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (timeRange === '1d') {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            {formatDate(label)}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ 
                color: entry.color,
                fontWeight: 500,
              }}
            >
              {chartType === 'price' 
                ? `Price: ${formatPrice(entry.value)}`
                : `Volume: ${formatVolume(entry.value)}`
              }
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const currentPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[chartData.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
        border: '1px solid rgba(76, 175, 80, 0.1)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1a3b2e 0%, #4CAF50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {formatPrice(currentPrice)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isPositive ? 'success.main' : 'error.main',
                  fontWeight: 600,
                }}
              >
                {isPositive ? '+' : ''}{formatPrice(priceChange)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {/* Chart Type Toggle */}
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={(e, newType) => newType && setChartType(newType)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  borderColor: 'rgba(76, 175, 80, 0.3)',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <ToggleButton value="price">Price</ToggleButton>
              <ToggleButton value="volume">Volume</ToggleButton>
            </ToggleButtonGroup>

            {/* Time Range Toggle */}
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={(e, newRange) => newRange && setTimeRange(newRange)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  borderColor: 'rgba(76, 175, 80, 0.3)',
                  color: 'text.secondary',
                  minWidth: 40,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <ToggleButton value="1d">1D</ToggleButton>
              <ToggleButton value="7d">7D</ToggleButton>
              <ToggleButton value="30d">30D</ToggleButton>
              <ToggleButton value="90d">90D</ToggleButton>
              <ToggleButton value="1y">1Y</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'price' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isPositive ? '#4CAF50' : '#f44336'}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? '#4CAF50' : '#f44336'}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(76, 175, 80, 0.1)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  tickFormatter={formatPrice}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? '#4CAF50' : '#f44336'}
                  strokeWidth={3}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            ) : (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="#2196F3"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="#2196F3"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(76, 175, 80, 0.1)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  tickFormatter={formatVolume}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#2196F3"
                  strokeWidth={3}
                  fill="url(#volumeGradient)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PriceChart;