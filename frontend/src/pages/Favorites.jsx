import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaArrowLeft, FaHospital, FaFlask } from 'react-icons/fa';
import Footer from '../components/Footer';
import HospitalCard from '../components/HospitalCard';
import LabCard from '../components/LabCard';
import API_URL from '../config/api';
import INITIAL_HOSPITALS from '../data/hospitalsData';
import INITIAL_LABORATORIES from '../data/laboratoriesData';
import { useFavourites } from '../hooks/useFavourites';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({
    hospitals: [],
    laboratories: []
  });
  const [activeTab, setActiveTab] = useState('hospitals');
  const [loading, setLoading] = useState(true);

  const { isFavorite, toggleFavorite } = useFavourites();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Local storage fallback data
      let localFavs = { hospitals: [], laboratories: [] };
      try {
        const stored = localStorage.getItem('mednexus_favorites_v1');
        if (stored) {
          localFavs = JSON.parse(stored);
        }
      } catch (e) {
        console.warn(e);
      }

      let apiHospitals = [];
      let apiLabs = [];

      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data?.data) {
            apiHospitals = response.data.data.hospitals || [];
            apiLabs = response.data.data.laboratories || [];
          }
        } catch (error) {
          console.warn('API favorites fetch failed, falling back to local cache:', error.message);
        }
      }

      // Resolve hospital items (from API or from INITIAL_HOSPITALS using local IDs)
      const allHospitalIds = new Set([
        ...apiHospitals.map((h) => (typeof h === 'string' ? h : h._id || h.id)),
        ...(localFavs.hospitals || [])
      ]);

      const resolvedHospitals = Array.from(allHospitalIds).map((id) => {
        const foundApi = apiHospitals.find((h) => (h._id || h.id) === id);
        if (foundApi && typeof foundApi === 'object') return foundApi;
        const foundInit = INITIAL_HOSPITALS.find((h) => h._id === id || h.id === id);
        return foundInit || { _id: id, id, name: 'Hospital' };
      }).filter((h) => h && h.name);

      // Resolve laboratory items
      const allLabIds = new Set([
        ...apiLabs.map((l) => (typeof l === 'string' ? l : l._id || l.id)),
        ...(localFavs.laboratories || [])
      ]);

      const resolvedLabs = Array.from(allLabIds).map((id) => {
        const foundApi = apiLabs.find((l) => (l._id || l.id) === id);
        if (foundApi && typeof foundApi === 'object') return foundApi;
        const foundInit = INITIAL_LABORATORIES.find((l) => l._id === id || l.id === id);
        return foundInit || { _id: id, id, name: 'Laboratory' };
      }).filter((l) => l && l.name);

      setFavorites({
        hospitals: resolvedHospitals,
        laboratories: resolvedLabs
      });
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (facility, type = 'hospital') => {
    await toggleFavorite(facility, type);
    const id = facility._id || facility.id;
    setFavorites((prev) => ({
      ...prev,
      [type === 'hospital' ? 'hospitals' : 'laboratories']: prev[
        type === 'hospital' ? 'hospitals' : 'laboratories'
      ].filter((item) => (item._id || item.id) !== id)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold text-sm transition"
        >
          <FaArrowLeft className="text-xs" /> Back
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
            <FaHeart className="text-red-500" /> My Saved Facilities
          </h1>
          <p className="text-gray-600 text-sm">
            Quickly access and compare your bookmarked hospitals and diagnostic centers.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-sm ${
              activeTab === 'hospitals'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FaHospital />
            <span>Hospitals ({favorites.hospitals?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('laboratories')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 shadow-sm ${
              activeTab === 'laboratories'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FaFlask />
            <span>Laboratories ({favorites.laboratories?.length || 0})</span>
          </button>
        </div>

        {/* Content: Hospitals */}
        {activeTab === 'hospitals' && (
          <div>
            {favorites.hospitals && favorites.hospitals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.hospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital._id || hospital.id}
                    hospital={hospital}
                    isFavorite={true}
                    onFavoriteToggle={() => handleRemoveFavorite(hospital, 'hospital')}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-lg mx-auto">
                <FaHeart className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">No Favorite Hospitals Yet</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Click the heart icon on any hospital card to save it to your personal favorites list.
                </p>
                <button
                  onClick={() => navigate('/hospitals')}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm transition"
                >
                  Explore Hospitals
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content: Laboratories */}
        {activeTab === 'laboratories' && (
          <div>
            {favorites.laboratories && favorites.laboratories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.laboratories.map((lab) => (
                  <LabCard
                    key={lab._id || lab.id}
                    lab={lab}
                    isFavorite={true}
                    onFavoriteToggle={() => handleRemoveFavorite(lab, 'laboratory')}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-lg mx-auto">
                <FaHeart className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">No Favorite Laboratories Yet</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Click the heart icon on any diagnostic laboratory to bookmark it for quick access.
                </p>
                <button
                  onClick={() => navigate('/labs')}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm transition"
                >
                  Explore Laboratories
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
