const axios = require('axios');

/**
 * Geocode address/destination using Geoapify API with smart fallback
 * @param {string} title - Destination title/name
 * @param {string} state - State/Region
 * @param {string} country - Country
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
const geocodeDestination = async (title, state, country) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const addressQuery = `${title}, ${state}, ${country}`;

  if (apiKey && apiKey !== 'your_geoapify_key') {
    try {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        addressQuery
      )}&apiKey=${apiKey}`;
      const response = await axios.get(url);

      if (
        response.data &&
        response.data.features &&
        response.data.features.length > 0
      ) {
        const [lon, lat] = response.data.features[0].geometry.coordinates;
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        };
      }
    } catch (err) {
      console.warn(`[Geocoder Warning] Geoapify geocode failed: ${err.message}. Falling back to default coordinates.`);
    }
  }

  // Fallback preset lookup for common Indian & Global regions
  const lowerState = (state || '').toLowerCase();
  const lowerCountry = (country || '').toLowerCase();
  const lowerTitle = (title || '').toLowerCase();

  // Known fallback coordinate dictionary
  if (lowerTitle.includes('dudhsagar') || lowerState.includes('goa')) {
    return { latitude: 15.3144, longitude: 74.3143 };
  }
  if (lowerTitle.includes('munnar') || lowerState.includes('kerala')) {
    return { latitude: 10.0889, longitude: 77.0595 };
  }
  if (lowerTitle.includes('taj mahal') || lowerTitle.includes('agra')) {
    return { latitude: 27.1751, longitude: 78.0421 };
  }
  if (lowerTitle.includes('pangong') || lowerState.includes('ladakh')) {
    return { latitude: 33.7595, longitude: 78.6674 };
  }
  if (lowerTitle.includes('kedarnath') || lowerState.includes('uttarakhand')) {
    return { latitude: 30.7346, longitude: 79.0669 };
  }
  if (lowerTitle.includes('coorg') || lowerState.includes('karnataka')) {
    return { latitude: 12.3375, longitude: 75.8069 };
  }

  // Default central fallback coordinates (India central reference or general center)
  if (lowerCountry.includes('india')) {
    return { latitude: 20.5937, longitude: 78.9629 };
  }

  return { latitude: 15.4989, longitude: 73.8278 };
};

module.exports = { geocodeDestination };
