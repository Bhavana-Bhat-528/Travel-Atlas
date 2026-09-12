/* Leaflet Map Initialization with Geoapify Map Tiles */

document.addEventListener('DOMContentLoaded', () => {
  const getGeoapifyKey = (element) => {
    return (
      (element && element.getAttribute('data-geoapify-key')) ||
      (typeof window !== 'undefined' && window.GEOAPIFY_API_KEY) ||
      ''
    );
  };

  const getGeoapifyTileLayer = (apiKey) => {
    const isRetina = L.Browser.retina;
    const tileUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}${isRetina ? '@2x' : ''}.png?apiKey=${apiKey}`;

    return L.tileLayer(tileUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a> contributors',
      maxZoom: 20,
      id: 'osm-bright'
    });
  };

  // 1. Single Destination Map Handler
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const lat = parseFloat(mapElement.getAttribute('data-lat')) || 15.4989;
    const lng = parseFloat(mapElement.getAttribute('data-lng')) || 73.8278;
    const title = mapElement.getAttribute('data-title') || 'Destination Location';
    const state = mapElement.getAttribute('data-state') || '';
    const country = mapElement.getAttribute('data-country') || '';
    const apiKey = getGeoapifyKey(mapElement);

    const map = L.map('map').setView([lat, lng], 11);

    getGeoapifyTileLayer(apiKey).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div style="background: #0284c7; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;"><i class="fa-solid fa-location-dot"></i></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: sans-serif; text-align: center; padding: 4px;">
        <strong style="font-size: 1.05rem; color: #0f172a;">${title}</strong><br/>
        <span style="font-size: 0.85rem; color: #64748b;">${state}, ${country}</span>
      </div>
    `).openPopup();
  }

  // 2. Multi-Destination Explore Map Handler
  const clusterMapElement = document.getElementById('cluster-map');
  if (clusterMapElement) {
    const rawData = clusterMapElement.getAttribute('data-destinations');
    const apiKey = getGeoapifyKey(clusterMapElement);
    let destinations = [];
    try {
      destinations = JSON.parse(rawData);
    } catch (e) {
      console.error('Error parsing map data', e);
    }

    // Default center (India/Global center)
    const exploreMap = L.map('cluster-map').setView([20.5937, 78.9629], 5);

    getGeoapifyTileLayer(apiKey).addTo(exploreMap);

    const bounds = [];

    destinations.forEach((item) => {
      if (item.coordinates && item.coordinates.latitude && item.coordinates.longitude) {
        const lat = item.coordinates.latitude;
        const lng = item.coordinates.longitude;
        bounds.push([lat, lng]);

        const markerIcon = L.divIcon({
          className: 'custom-leaflet-marker-explore',
          html: `<div style="background: #059669; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.85rem;"><i class="fa-solid fa-compass"></i></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28]
        });

        const m = L.marker([lat, lng], { icon: markerIcon }).addTo(exploreMap);
        m.bindPopup(`
          <div style="min-width: 180px; text-align: left;">
            <img src="${item.coverUrl}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
            <strong style="color: #0f172a; font-size: 0.95rem;">${item.title}</strong><br/>
            <span style="font-size: 0.8rem; color: #64748b;">📍 ${item.state}, ${item.country}</span><br/>
            <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8rem; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${item.category}</span>
              <a href="/destinations/${item.id}" style="font-size: 0.8rem; font-weight: 700; color: #059669;">View Page &rarr;</a>
            </div>
          </div>
        `);
      }
    });

    if (bounds.length > 0) {
      exploreMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }
});
