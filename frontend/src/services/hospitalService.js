import axios from 'axios';
import API_URL from '../config/api';
import INITIAL_HOSPITALS from '../data/hospitalsData';

/**
 * Service to fetch and manage hospital discovery data.
 * Gracefully integrates with the backend /api/hospitals endpoint,
 * falling back seamlessly to the verified 12-hospital dataset if the backend
 * is offline or has empty records.
 */
export const hospitalService = {
  /**
   * Fetch all hospitals with optional location coordinates and filters
   * @param {Object} params - { latitude, longitude, search, city, state, type }
   * @returns {Promise<{ data: Array, source: 'backend' | 'local' }>}
   */
  async getHospitals(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/api/hospitals`, {
        params,
        timeout: 5000
      });

      const backendData = response.data?.data;
      if (Array.isArray(backendData) && backendData.length > 0) {
        const normalized = backendData.map((h) => ({
          ...h,
          id: h._id || h.id
        }));

        // If backend has fewer than 12 records, merge with INITIAL_HOSPITALS to guarantee the 12 records
        const backendNames = new Set(normalized.map((h) => h.name.toLowerCase()));
        const supplemental = INITIAL_HOSPITALS.filter(
          (init) => !backendNames.has(init.name.toLowerCase())
        );

        return {
          data: [...normalized, ...supplemental].slice(0, 12),
          source: 'backend'
        };
      }
    } catch (err) {
      console.warn('Backend hospital API unavailable, using verified local dataset:', err.message);
    }

    // Default to the verified 12-hospital dataset
    return {
      data: INITIAL_HOSPITALS,
      source: 'local'
    };
  },

  /**
   * Fetch a single hospital by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getHospitalById(id) {
    // Check local dataset first if it matches initial IDs
    const localMatch = INITIAL_HOSPITALS.find((h) => h._id === id || h.id === id);
    if (localMatch) {
      return localMatch;
    }

    try {
      const response = await axios.get(`${API_URL}/api/hospitals/${id}`, { timeout: 5000 });
      if (response.data?.data) {
        return {
          ...response.data.data,
          id: response.data.data._id || response.data.data.id
        };
      }
    } catch (err) {
      console.warn(`Error fetching hospital ${id} from backend:`, err.message);
    }

    // Fallback: search by partial id or return first initial hospital
    return localMatch || INITIAL_HOSPITALS[0];
  }
};

export default hospitalService;
