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
  if (lowerTitle.includes('dudhsagar')) {
    return { latitude: 15.3144, longitude: 74.3143 };
  }
  if (lowerTitle.includes('munnar')) {
    return { latitude: 10.0889, longitude: 77.0595 };
  }
  if (lowerTitle.includes('taj mahal') || lowerTitle.includes('agra')) {
    return { latitude: 27.1751, longitude: 78.0421 };
  }
  if (lowerTitle.includes('pangong')) {
    return { latitude: 33.7595, longitude: 78.6674 };
  }
  if (lowerTitle.includes('radhanagar') || lowerTitle.includes('havelock')) {
    return { latitude: 11.9842, longitude: 92.9525 };
  }
  if (lowerTitle.includes('kedarnath')) {
    return { latitude: 30.7346, longitude: 79.0669 };
  }
  if (lowerTitle.includes('corbett')) {
    return { latitude: 29.5300, longitude: 78.7747 };
  }
  if (lowerTitle.includes('rishikesh')) {
    return { latitude: 30.0869, longitude: 78.2676 };
  }
  if (lowerTitle.includes('amer') || lowerTitle.includes('jaipur')) {
    return { latitude: 26.9855, longitude: 75.8513 };
  }
  if (lowerTitle.includes('rohtang') || lowerTitle.includes('manali')) {
    return { latitude: 32.3716, longitude: 77.2466 };
  }
  if (lowerTitle.includes('coorg')) {
    return { latitude: 12.3375, longitude: 75.8069 };
  }
  if (lowerTitle.includes('varanasi') || lowerTitle.includes('kashi')) {
    return { latitude: 25.3176, longitude: 83.0104 };
  }
  if (lowerTitle.includes('alleppey') || lowerTitle.includes('alappuzha')) {
    return { latitude: 9.4981, longitude: 76.3388 };
  }
  if (lowerTitle.includes('vastu sangrahalaya') || lowerTitle.includes('mumbai museum')) {
    return { latitude: 18.9269, longitude: 72.8327 };
  }
  if (lowerTitle.includes('meenakshi') || lowerTitle.includes('madurai')) {
    return { latitude: 9.9195, longitude: 78.1193 };
  }

  // State level fallbacks
  if (lowerState.includes('goa')) return { latitude: 15.2993, longitude: 74.1240 };
  if (lowerState.includes('kerala')) return { latitude: 10.8505, longitude: 76.2711 };
  if (lowerState.includes('ladakh')) return { latitude: 34.1526, longitude: 77.5771 };
  if (lowerState.includes('uttarakhand')) return { latitude: 30.0668, longitude: 79.0193 };
  if (lowerState.includes('karnataka')) return { latitude: 15.3173, longitude: 75.7139 };
  if (lowerState.includes('rajasthan')) return { latitude: 27.0238, longitude: 74.2179 };
  if (lowerState.includes('himachal')) return { latitude: 31.1048, longitude: 77.1734 };
  if (lowerState.includes('maharashtra')) return { latitude: 19.7515, longitude: 75.7139 };
  if (lowerState.includes('tamil nadu')) return { latitude: 11.1271, longitude: 78.6569 };

  // Default central fallback coordinates (India central reference or general center)
  if (lowerCountry.includes('india')) {
    return { latitude: 20.5937, longitude: 78.9629 };
  }

  return { latitude: 15.4989, longitude: 73.8278 };
};

module.exports = { geocodeDestination };
