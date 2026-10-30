import React, { useState, useEffect, useMemo } from 'react';
import HospitalCard from '../components/HospitalCard';
import {
  FaHospital,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaSortAmountDown,
  FaTimes,
  FaLocationArrow,
  FaCheckCircle
} from 'react-icons/fa';
import Footer from '../components/Footer';
import hospitalService from '../services/hospitalService';
import { useGeolocation } from '../hooks/useGeolocation';
import { useFavourites } from '../hooks/useFavourites';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All'); // Private / Government
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [minRating, setMinRating] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'distance', 'rating', 'name'
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const { userLocation, locationStatus, requestLocation, getDistanceTo } = useGeolocation();
  const { isFavorite, toggleFavorite } = useFavourites();

  // Fetch hospitals on mount
  useEffect(() => {
    let isMounted = true;
    const loadHospitals = async () => {
      try {
        setLoading(true);
        const res = await hospitalService.getHospitals();
        if (isMounted) {
          setHospitals(res.data);
        }
      } catch (err) {
        console.error('Error loading hospitals:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHospitals();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute unique filter options from dataset
  const filterOptions = useMemo(() => {
    const states = new Set();
    const cities = new Set();
    const specialties = new Set();
    const categories = new Set();

    hospitals.forEach((h) => {
      if (h.address?.state) states.add(h.address.state);
      if (h.address?.city) cities.add(h.address.city);
      if (h.category) categories.add(h.category);
      if (Array.isArray(h.specialties)) {
        h.specialties.forEach((s) => specialties.add(s));
      }
    });

    return {
      states: ['All', ...Array.from(states).sort()],
      cities: ['All', ...Array.from(cities).sort()],
      categories: ['All', ...Array.from(categories).sort()],
      specialties: ['All', ...Array.from(specialties).sort()]
    };
  }, [hospitals]);

  // Compute distance for each hospital
  const hospitalsWithDistance = useMemo(() => {
    return hospitals.map((hosp) => {
      let dist = null;
      if (userLocation && hosp.location?.coordinates) {
        dist = getDistanceTo(hosp.location.coordinates);
      }
      return {
        ...hosp,
        computedDistance: dist
      };
    });
  }, [hospitals, userLocation, getDistanceTo]);

  // Filter and sort hospitals
  const filteredHospitals = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return hospitalsWithDistance
      .filter((hospital) => {
        // Search term matches: name, city, state, area, type, or specialties
        const matchSearch =
          !term ||
          hospital.name.toLowerCase().includes(term) ||
          hospital.address?.city?.toLowerCase().includes(term) ||
          hospital.address?.state?.toLowerCase().includes(term) ||
          hospital.address?.area?.toLowerCase().includes(term) ||
          hospital.type?.toLowerCase().includes(term) ||
          (hospital.specialties &&
            hospital.specialties.some((s) => s.toLowerCase().includes(term)));

        // State filter
        const matchState =
          selectedState === 'All' ||
          hospital.address?.state?.toLowerCase() === selectedState.toLowerCase();

        // City filter
        const matchCity =
          selectedCity === 'All' ||
          hospital.address?.city?.toLowerCase() === selectedCity.toLowerCase();

        // Category filter (Private / Government / Public)
        const matchCategory =
          selectedCategory === 'All' ||
          hospital.category?.toLowerCase() === selectedCategory.toLowerCase();

        // Specialty filter
        const matchSpecialty =
          selectedSpecialty === 'All' ||
          (hospital.specialties &&
            hospital.specialties.some(
              (s) => s.toLowerCase() === selectedSpecialty.toLowerCase()
            ));

        // Minimum rating filter
        let matchRating = true;
        if (minRating === '4.0') {
          matchRating = (hospital.googleRating || 0) >= 4.0;
        } else if (minRating === '4.5') {
          matchRating = (hospital.googleRating || 0) >= 4.5;
        }

        return (
          matchSearch &&
          matchState &&
          matchCity &&
          matchCategory &&
          matchSpecialty &&
          matchRating
        );
      })
      .sort((a, b) => {
        if (sortBy === 'distance' && userLocation) {
          if (a.computedDistance === null) return 1;
          if (b.computedDistance === null) return -1;
          return a.computedDistance - b.computedDistance;
        }
        if (sortBy === 'rating') {
          return (b.googleRating || 0) - (a.googleRating || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0; // Default original curated order
      });
  }, [
    hospitalsWithDistance,
    searchTerm,
    selectedState,
    selectedCity,
    selectedCategory,
    selectedSpecialty,
    minRating,
    sortBy,
    userLocation
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedCity('All');
    setSelectedCategory('All');
    setSelectedSpecialty('All');
    setMinRating('All');
    setSortBy('default');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedState !== 'All' ||
    selectedCity !== 'All' ||
    selectedCategory !== 'All' ||
    selectedSpecialty !== 'All' ||
    minRating !== 'All' ||
    sortBy !== 'default';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl text-blue-600 mb-3 shadow-sm">
            <FaHospital className="text-3xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Hospitals Across India
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Discover verified tertiary care hospitals, compare medical infrastructure, and locate
            specialized departments across top medical destinations in India.
          </p>
        </div>

        {/* Location Banner */}
        <div className="mb-6 max-w-3xl mx-auto">
          {locationStatus === 'granted' ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4 flex items-center justify-between text-xs sm:text-sm text-emerald-800 shadow-sm">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0" />
                <span>
                  <strong>Location enabled.</strong> Real-time Haversine distance calculated for each
                  hospital.
                </span>
              </div>
              {sortBy !== 'distance' && (
                <button
                  onClick={() => setSortBy('distance')}
                  className="font-bold text-emerald-700 hover:text-emerald-900 underline flex-shrink-0 ml-2"
                >
                  Sort by Nearest
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-700 shadow-sm">
              <div className="flex items-center gap-2.5">
                <FaLocationArrow className="text-blue-500 text-base flex-shrink-0" />
                <span>
                  Want to know which hospital is closest to you? Enable your location to view exact
                  distances.
                </span>
              </div>
              <button
                type="button"
                onClick={() => requestLocation(true)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                <FaLocationArrow className="text-[11px]" />
                <span>Use My Location</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Bar Section */}
        <div className="mb-6 max-w-3xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hospitals by name, city or state..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 text-sm transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
              <FaFilter className="text-blue-600" />
              <span>Filters & Sorting</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* State Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('All'); // Reset city when state changes
                }}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.states.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Ownership Type Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Ownership
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All">All Ratings</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="default">Recommended</option>
                <option value="distance" disabled={!userLocation}>
                  Nearest Distance {!userLocation ? '(Enable GPS)' : ''}
                </option>
                <option value="rating">Highest Rating</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Count Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700 text-sm font-medium">
            Showing <strong className="text-gray-900 font-bold">{filteredHospitals.length}</strong>{' '}
            hospital{filteredHospitals.length !== 1 ? 's' : ''}
            {hasActiveFilters && <span className="text-gray-500 ml-1.5">(Filtered)</span>}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>Verified Initial Dataset</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4" />
            <p className="text-gray-600 font-medium text-sm">Loading hospitals across India...</p>
          </div>
        ) : filteredHospitals.length > 0 ? (
          /* Three-Column Desktop Layout (Section 15 & 16) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital._id || hospital.id}
                hospital={hospital}
                distance={hospital.computedDistance}
                isFavorite={isFavorite(hospital._id || hospital.id, 'hospital')}
                onFavoriteToggle={() => toggleFavorite(hospital, 'hospital')}
              />
            ))}
          </div>
        ) : (
          /* Empty Search & Filter State */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHospital className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Hospitals Found</h3>
            <p className="text-xs text-gray-500 mb-6">
              No medical facilities matched your search criteria. Try clearing some filters or searching
              for another city.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Hospitals;
