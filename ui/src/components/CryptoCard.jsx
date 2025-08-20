import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Star,
  StarBorder,
  MoreVert,
} from '@mui/icons-material';

const CryptoCard = ({
  id,
  name,
  symbol,
  price,
  change24h,
  change7d,
  marketCap,
  volume24h,
  image,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const isPositive = change24h >= 0;
  const isPositive7d = change7d >= 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${(value / 1e3).toFixed(2)}K`;
  };

  return (
    <Card
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
        '&:hover': {
          boxShadow: '0 16px 64px rgba(26, 59, 46, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header con logo y acciones */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={image}
              alt={name}
              sx={{
                width: 48,
                height: 48,
                border: '2px solid rgba(76, 175, 80, 0.1)',
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {symbol}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
              <IconButton
                onClick={() => onToggleFavorite?.(id)}
                sx={{
                  color: isFavorite ? 'secondary.main' : 'text.secondary',
                }}
              >
                {isFavorite ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        {/* Precio */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(135deg, #1a3b2e 0%, #4CAF50 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {formatPrice(price)}
        </Typography>

        {/* Cambios de precio */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip
            icon={isPositive ? <TrendingUp /> : <TrendingDown />}
            label={`${isPositive ? '+' : ''}${change24h.toFixed(2)}%`}
            size="small"
            sx={{
              backgroundColor: isPositive ? 'rgba(0, 230, 118, 0.1)' : 'rgba(244, 67, 54, 0.1)',
              color: isPositive ? 'success.main' : 'error.main',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: isPositive ? 'success.main' : 'error.main',
              },
            }}
          />
          <Chip
            label={`7d: ${isPositive7d ? '+' : ''}${change7d.toFixed(2)}%`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: isPositive7d ? 'success.main' : 'error.main',
              color: isPositive7d ? 'success.main' : 'error.main',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Estadísticas adicionales */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatMarketCap(marketCap)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Volume (24h)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatMarketCap(volume24h)}
            </Typography>
          </Box>
        </Box>

        {/* Indicador de tendencia visual */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 4,
            height: '100%',
            background: isPositive 
              ? 'linear-gradient(to bottom, #00E676, #4CAF50)'
              : 'linear-gradient(to bottom, #f44336, #d32f2f)',
            borderRadius: '0 16px 16px 0',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CryptoCard;