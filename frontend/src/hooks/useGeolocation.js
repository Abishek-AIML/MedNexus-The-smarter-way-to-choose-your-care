import { useState, useEffect, useCallback } from 'react';
import { calculateDistance } from '../utils/calculateDistance';

/**
 * Custom hook for managing browser Geolocation API permissions,
 * user coordinates, and distance calculations.
 */
export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mednexus_user_coords');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [locationStatus, setLocationStatus] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mednexus_user_coords');
      return saved ? 'granted' : 'idle';
    } catch {
      return 'idle';
    }
  });

  const [errorMessage, setErrorMessage] = useState(null);

  // Check permission state on mount if supported
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            requestLocation(false);
          } else if (permissionStatus.state === 'denied') {
            setLocationStatus('denied');
          }
        })
        .catch(() => {
          // Ignore permissions API failures
        });
    }
  }, []);

  const requestLocation = useCallback((isManualRequest = true) => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        setUserLocation(coords);
        setLocationStatus('granted');
        setErrorMessage(null);
        try {
          sessionStorage.setItem('mednexus_user_coords', JSON.stringify(coords));
        } catch (e) {
          console.warn('Could not cache user coordinates', e);
        }
      },
      (error) => {
        let msg = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus('denied');
            msg = 'Location permission was denied. Distances cannot be shown.';
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus('unavailable');
            msg = 'Location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            setLocationStatus('unavailable');
            msg = 'Location request timed out.';
            break;
          default:
            setLocationStatus('denied');
            break;
        }
        setErrorMessage(msg);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  }, []);

  /**
   * Helper to compute distance from user to a destination facility
   * @param {Array<number>|Object} destination - [lng, lat] GeoJSON coordinates or { lat, lng } / { latitude, longitude }
   * @returns {number|null} distance in km or null
   */
  const getDistanceTo = useCallback(
    (destination) => {
      if (!userLocation) return null;

      let destLat, destLng;
      if (Array.isArray(destination) && destination.length >= 2) {
        // GeoJSON [longitude, latitude]
        destLng = destination[0];
        destLat = destination[1];
      } else if (destination && typeof destination === 'object') {
        destLat = destination.latitude ?? destination.lat;
        destLng = destination.longitude ?? destination.lng;
      }

      if (destLat === undefined || destLng === undefined) return null;

      return calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        destLat,
        destLng
      );
    },
    [userLocation]
  );

  return {
    userLocation,
    locationStatus,
    errorMessage,
    requestLocation,
    getDistanceTo
  };
};

export default useGeolocation;
