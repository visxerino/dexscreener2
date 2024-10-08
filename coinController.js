const axios = require('axios');

const formatPrice = (num) => {
  if (typeof num === 'number' && !isNaN(num)) {
    return '$' + num.toLocaleString('en-US', {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
    });
  }
  return 'N/A';
};

const formatNumber = (num) => {
  if (typeof num === 'number' && !isNaN(num)) {
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return '$' + (num / 1000).toFixed(2) + 'K';
    }
    return '$' + num.toFixed(2);
  }
  return 'N/A';
};

exports.getMultipleTokensData = async (req, res) => {
  try {
    console.log('Fetching token list...');
    const tokenListResponse = await axios.get('https://api.raydium.io/v2/main/pairs');
    console.log('Token list received.');

    const tokenPairs = Object.values(tokenListResponse.data);
    console.log(`Total pairs: ${tokenPairs.length}`);

    const formattedData = tokenPairs.slice(0, 20).map(pair => {
      const price = parseFloat(pair.price) || 0;
      const liquidity = parseFloat(pair.liquidity) || 0;
      const volume = parseFloat(pair.volume24h) || 0;
      const apr = (parseFloat(pair.apr24h) || 0) * 100;

      return {
        nameTicker: `${pair.name || 'Unknown'} (${pair.symbol || 'N/A'})`,
        price: formatPrice(price),
        liquidity: formatNumber(liquidity),
        volume: formatNumber(volume),
        apr: apr.toFixed(2) + '%'
      };
    });

    console.log('Formatted data:', JSON.stringify(formattedData, null, 2));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching token data:', error);
    res.status(500).json({ error: 'Failed to fetch token data', details: error.message });
  }
};