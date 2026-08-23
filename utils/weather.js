const axios = require('axios');

/**
 * Maps WMO Weather Interpretation Codes to human readable labels & FontAwesome icons
 * @param {number} code - WMO weather code
 * @returns {{ condition: string, iconClass: string }}
 */
const getWeatherCondition = (code) => {
  switch (code) {
    case 0:
      return { condition: 'Clear Sky', iconClass: 'fa-solid fa-sun text-warning' };
    case 1:
    case 2:
      return { condition: 'Partly Cloudy', iconClass: 'fa-solid fa-cloud-sun text-warning' };
    case 3:
      return { condition: 'Overcast', iconClass: 'fa-solid fa-cloud text-secondary' };
    case 45:
    case 48:
      return { condition: 'Foggy & Misty', iconClass: 'fa-solid fa-smog text-secondary' };
    case 51:
    case 53:
    case 55:
      return { condition: 'Light Drizzle', iconClass: 'fa-solid fa-cloud-rain text-info' };
    case 61:
    case 63:
    case 65:
      return { condition: 'Rainy', iconClass: 'fa-solid fa-cloud-showers-heavy text-info' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { condition: 'Snowfall', iconClass: 'fa-solid fa-snowflake text-info' };
    case 80:
    case 81:
    case 82:
      return { condition: 'Rain Showers', iconClass: 'fa-solid fa-cloud-sun-rain text-info' };
    case 85:
    case 86:
      return { condition: 'Snow Showers', iconClass: 'fa-solid fa-snowflake text-info' };
    case 95:
    case 96:
    case 99:
      return { condition: 'Thunderstorm', iconClass: 'fa-solid fa-cloud-bolt text-danger' };
    default:
      return { condition: 'Mild', iconClass: 'fa-solid fa-cloud-sun text-primary' };
  }
};

/**
 * Fetches real current weather for a destination given lat and lon
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<{isAvailable: boolean, temperature?: number, feelsLike?: number, humidity?: number, windSpeed?: number, condition?: string, iconClass?: string}>}
 */
const getDestinationWeather = async (latitude, longitude) => {
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return { isAvailable: false };
  }

  try {
    // Open-Meteo real-time meteorology API (No API key required, highly reliable worldwide coordinates weather provider)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
    
    const response = await axios.get(url, { timeout: 3500 });
    
    if (response.data && response.data.current) {
      const current = response.data.current;
      const { condition, iconClass } = getWeatherCondition(current.weather_code);

      return {
        isAvailable: true,
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        condition,
        iconClass
      };
    }
  } catch (err) {
    console.warn(`[Weather Service Warning] Weather fetch failed for coords (${latitude}, ${longitude}): ${err.message}`);
  }

  return { isAvailable: false };
};

module.exports = { getDestinationWeather };
