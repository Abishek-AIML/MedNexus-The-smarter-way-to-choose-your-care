import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../config/api';

const STORAGE_KEY = 'mednexus_favorites_v1';

export const useFavourites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { hospitals: [], laboratories: [] };
    } catch {
      return { hospitals: [], laboratories: [] };
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync with API if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let isMounted = true;
    const fetchApiFavorites = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (isMounted && res.data?.data) {
          const apiFavs = res.data.data;
          const hospitalIds = (apiFavs.hospitals || []).map((h) => (typeof h === 'string' ? h : h._id || h.id));
          const labIds = (apiFavs.laboratories || []).map((l) => (typeof l === 'string' ? l : l._id || l.id));

          // Merge local and API favorites
          setFavorites((prev) => {
            const merged = {
              hospitals: Array.from(new Set([...prev.hospitals, ...hospitalIds])),
              laboratories: Array.from(new Set([...prev.laboratories, ...labIds]))
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch (err) {
              console.warn(err);
            }
            return merged;
          });
        }
      } catch (err) {
        // Backend offline or token expired - silent fallback to localStorage
        console.warn('API favorites sync skipped (using offline/demo localStorage):', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApiFavorites();
    return () => {
      isMounted = false;
    };
  }, []);

  const isFavorite = useCallback(
    (facilityId, type = 'hospital') => {
      if (!facilityId) return false;
      const key = type === 'hospital' ? 'hospitals' : 'laboratories';
      return favorites[key]?.includes(String(facilityId)) || false;
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (facility, type = 'hospital') => {
      if (!facility) return;
      const id = String(facility._id || facility.id);
      const name = facility.name || (type === 'hospital' ? 'Hospital' : 'Laboratory');
      const key = type === 'hospital' ? 'hospitals' : 'laboratories';
      const isAlready = favorites[key]?.includes(id);

      // Optimistic update
      const updatedList = isAlready
        ? favorites[key].filter((favId) => favId !== id)
        : [...favorites[key], id];

      const newFavorites = {
        ...favorites,
        [key]: updatedList
      };

      setFavorites(newFavorites);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      } catch (e) {
        console.warn('Error saving favorites to localStorage', e);
      }

      if (isAlready) {
        toast.success(`Removed ${name} from favorites`, { icon: '💔' });
      } else {
        toast.success(`Added ${name} to favorites!`, { icon: '❤️' });
      }

      // Sync with backend if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const endpoint = isAlready
            ? `${API_URL}/api/favorites/remove`
            : `${API_URL}/api/favorites/add`;
          await axios.post(
            endpoint,
            { facilityId: id, facilityType: type === 'hospital' ? 'hospital' : 'laboratory' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.warn('Backend favorite sync error (kept in localStorage):', err.message);
        }
      }
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    loading
  };
};

export default useFavourites;
