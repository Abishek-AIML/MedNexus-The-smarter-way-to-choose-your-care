import axios from 'axios';
import API_URL from '../config/api';
import INITIAL_LABORATORIES from '../data/laboratoriesData';

/**
 * Service to fetch and manage diagnostic laboratories discovery data.
 * Gracefully integrates with the backend /api/labs endpoint,
 * falling back seamlessly to the verified 10-lab dataset if the backend
 * is offline or has empty records.
 */
export const labService = {
  /**
   * Fetch all diagnostic labs with optional location coordinates and filters
   * @param {Object} params - { latitude, longitude, search, city, state, type }
   * @returns {Promise<{ data: Array, source: 'backend' | 'local' }>}
   */
  async getLabs(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/api/labs`, {
        params,
        timeout: 5000
      });

      const backendData = response.data?.data;
      if (Array.isArray(backendData) && backendData.length > 0) {
        const normalized = backendData.map((l) => ({
          ...l,
          id: l._id || l.id
        }));

        const backendNames = new Set(normalized.map((l) => l.name.toLowerCase()));
        const supplemental = INITIAL_LABORATORIES.filter(
          (init) => !backendNames.has(init.name.toLowerCase())
        );

        return {
          data: [...normalized, ...supplemental].slice(0, 10),
          source: 'backend'
        };
      }
    } catch (err) {
      console.warn('Backend lab API unavailable, using verified local dataset:', err.message);
    }

    // Default to the verified 10-laboratory dataset
    return {
      data: INITIAL_LABORATORIES,
      source: 'local'
    };
  },

  /**
   * Fetch a single laboratory by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getLabById(id) {
    const localMatch = INITIAL_LABORATORIES.find((l) => l._id === id || l.id === id);
    if (localMatch) {
      return localMatch;
    }

    try {
      const response = await axios.get(`${API_URL}/api/labs/${id}`, { timeout: 5000 });
      if (response.data?.data) {
        return {
          ...response.data.data,
          id: response.data.data._id || response.data.data.id
        };
      }
    } catch (err) {
      console.warn(`Error fetching lab ${id} from backend:`, err.message);
    }

    return localMatch || INITIAL_LABORATORIES[0];
  }
};

export default labService;
