/**
 * Generates an opening URL for Google Maps navigation or search
 *
 * @param {Object} facility Facility object with name, address, coordinates, googlePlaceId
 * @returns {string} Google Maps URL
 */
export const getGoogleMapsUrl = (facility) => {
  if (!facility) return 'https://www.google.com/maps';

  const baseUrl = 'https://www.google.com/maps/dir/?api=1';

  if (facility.googlePlaceId) {
    return `${baseUrl}&destination=${encodeURIComponent(facility.name)}&destination_place_id=${encodeURIComponent(facility.googlePlaceId)}`;
  }

  if (facility.location?.coordinates && Array.isArray(facility.location.coordinates) && facility.location.coordinates.length >= 2) {
    const [lng, lat] = facility.location.coordinates;
    return `${baseUrl}&destination=${lat},${lng}`;
  }

  const parts = [
    facility.name,
    facility.address?.street,
    facility.address?.area,
    facility.address?.city,
    facility.address?.state,
    facility.address?.pincode,
    'India'
  ].filter(Boolean);

  const query = encodeURIComponent(parts.join(', '));
  return `${baseUrl}&destination=${query}`;
};

/**
 * Safely opens Google Maps in a new tab
 * @param {Object} facility
 */
export const openGoogleMaps = (facility) => {
  const url = getGoogleMapsUrl(facility);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default {
  getGoogleMapsUrl,
  openGoogleMaps
};
