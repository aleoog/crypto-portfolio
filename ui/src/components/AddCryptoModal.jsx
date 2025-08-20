import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Search,
  Add,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import DogLogo from './DogLogo';

// Datos simulados de criptomonedas disponibles
const availableCryptos = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    current_price: 43250.00,
    price_change_percentage_24h: 2.45,
    market_cap: 847392847392,
    total_volume: 15847392847,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    current_price: 2650.50,
    price_change_percentage_24h: -1.23,
    market_cap: 318472847392,
    total_volume: 8847392847,
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    current_price: 315.75,
    price_change_percentage_24h: 3.67,
    market_cap: 47392847392,
    total_volume: 2847392847,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    current_price: 0.485,
    price_change_percentage_24h: 4.21,
    market_cap: 17392847392,
    total_volume: 1847392847,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    current_price: 98.25,
    price_change_percentage_24h: -2.15,
    market_cap: 42392847392,
    total_volume: 3847392847,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    image: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    current_price: 0.82,
    price_change_percentage_24h: 1.85,
    market_cap: 7392847392,
    total_volume: 847392847,
  },
];

const AddCryptoModal = ({ open, onClose, onAddCrypto }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCryptos, setSelectedCryptos] = useState([]);

  const filteredCryptos = availableCryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price);
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${(value / 1e3).toFixed(2)}K`;
  };

  const handleToggleSelect = (crypto) => {
    setSelectedCryptos((prev) => {
      const isSelected = prev.find((c) => c.id === crypto.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== crypto.id);
      } else {
        return [...prev, crypto];
      }
    });
  };

  const handleAddSelected = () => {
    selectedCryptos.forEach((crypto) => {
      onAddCrypto({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.current_price,
        change24h: crypto.price_change_percentage_24h,
        change7d: Math.random() * 20 - 10, // Simulado
        marketCap: crypto.market_cap,
        volume24h: crypto.total_volume,
        image: crypto.image,
        isFavorite: false,
      });
    });
    setSelectedCryptos([]);
    setSearchTerm('');
    onClose();
  };

  const handleClose = () => {
    setSelectedCryptos([]);
    setSearchTerm('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          background: 'linear-gradient(135deg, #1a3b2e 0%, #2d5a47 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DogLogo fontSize="medium" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Agregar Criptomonedas
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Barra de búsqueda */}
        <TextField
          fullWidth
          placeholder="Buscar criptomonedas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        {/* Criptos seleccionadas */}
        {selectedCryptos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Seleccionadas ({selectedCryptos.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedCryptos.map((crypto) => (
                <Chip
                  key={crypto.id}
                  avatar={<Avatar src={crypto.image} sx={{ width: 24, height: 24 }} />}
                  label={`${crypto.name} (${crypto.symbol})`}
                  onDelete={() => handleToggleSelect(crypto)}
                  sx={{
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    color: 'primary.main',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Lista de criptomonedas disponibles */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Criptomonedas Disponibles
        </Typography>

        <Grid container spacing={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredCryptos.map((crypto) => {
            const isSelected = selectedCryptos.find((c) => c.id === crypto.id);
            const isPositive = crypto.price_change_percentage_24h >= 0;

            return (
              <Grid item xs={12} sm={6} key={crypto.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    border: isSelected
                      ? '2px solid #4CAF50'
                      : '1px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: isSelected
                      ? 'rgba(76, 175, 80, 0.05)'
                      : 'white',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 32px rgba(26, 59, 46, 0.12)',
                    },
                  }}
                  onClick={() => handleToggleSelect(crypto)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          src={crypto.image}
                          alt={crypto.name}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {crypto.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', textTransform: 'uppercase' }}
                          >
                            {crypto.symbol}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: isSelected
                            ? 'secondary.main'
                            : 'rgba(76, 175, 80, 0.1)',
                          color: isSelected ? 'white' : 'secondary.main',
                          '&:hover': {
                            backgroundColor: isSelected
                              ? 'secondary.dark'
                              : 'secondary.main',
                            color: 'white',
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      {formatPrice(crypto.current_price)}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        icon={isPositive ? <TrendingUp /> : <TrendingDown />}
                        label={`${isPositive ? '+' : ''}${crypto.price_change_percentage_24h.toFixed(2)}%`}
                        size="small"
                        sx={{
                          backgroundColor: isPositive
                            ? 'rgba(0, 230, 118, 0.1)'
                            : 'rgba(244, 67, 54, 0.1)',
                          color: isPositive ? 'success.main' : 'error.main',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          '& .MuiChip-icon': {
                            color: isPositive ? 'success.main' : 'error.main',
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Cap: {formatMarketCap(crypto.market_cap)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredCryptos.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 4,
            }}
          >
            <DogLogo fontSize="large" sx={{ mb: 2, opacity: 0.5 }} />
            <Typography variant="body1" color="text.secondary">
              No se encontraron criptomonedas
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
          Cancelar
        </Button>
        <Button
          onClick={handleAddSelected}
          variant="contained"
          disabled={selectedCryptos.length === 0}
          startIcon={<Add />}
        >
          Agregar ({selectedCryptos.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCryptoModal;