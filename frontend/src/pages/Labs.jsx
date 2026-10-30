import React, { useState, useEffect, useMemo } from 'react';
import LabCard from '../components/LabCard';
import {
  FaFlask,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
  FaLocationArrow,
  FaCheckCircle
} from 'react-icons/fa';
import Footer from '../components/Footer';
import labService from '../services/labService';
import { useGeolocation } from '../hooks/useGeolocation';
import { useFavourites } from '../hooks/useFavourites';

const Labs = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedOwnership, setSelectedOwnership] = useState('All'); // Independent, Franchise, Chain
  const [selectedService, setSelectedService] = useState('All');
  const [minRating, setMinRating] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const { userLocation, locationStatus, requestLocation, getDistanceTo } = useGeolocation();
  const { isFavorite, toggleFavorite } = useFavourites();

  // Fetch labs on mount
  useEffect(() => {
    let isMounted = true;
    const loadLabs = async () => {
      try {
        setLoading(true);
        const res = await labService.getLabs();
        if (isMounted) {
          setLabs(res.data);
        }
      } catch (err) {
        console.error('Error loading laboratories:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadLabs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute unique filter options from dataset
  const filterOptions = useMemo(() => {
    const states = new Set();
    const cities = new Set();
    const ownerships = new Set();
    const services = new Set();

    labs.forEach((l) => {
      if (l.address?.state) states.add(l.address.state);
      if (l.address?.city) cities.add(l.address.city);
      if (l.ownership) ownerships.add(l.ownership);
      if (Array.isArray(l.diagnosticServices)) {
        l.diagnosticServices.forEach((s) => services.add(s));
      }
    });

    return {
      states: ['All', ...Array.from(states).sort()],
      cities: ['All', ...Array.from(cities).sort()],
      ownerships: ['All', ...Array.from(ownerships).sort()],
      services: ['All', ...Array.from(services).sort()]
    };
  }, [labs]);

  // Compute distance for each laboratory
  const labsWithDistance = useMemo(() => {
    return labs.map((lab) => {
      let dist = null;
      if (userLocation && lab.location?.coordinates) {
        dist = getDistanceTo(lab.location.coordinates);
      }
      return {
        ...lab,
        computedDistance: dist
      };
    });
  }, [labs, userLocation, getDistanceTo]);

  // Filter and sort labs
  const filteredLabs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return labsWithDistance
      .filter((lab) => {
        // Search term matches: name, city, state, area, or diagnostic services
        const matchSearch =
          !term ||
          lab.name.toLowerCase().includes(term) ||
          lab.address?.city?.toLowerCase().includes(term) ||
          lab.address?.state?.toLowerCase().includes(term) ||
          lab.address?.area?.toLowerCase().includes(term) ||
          lab.category?.toLowerCase().includes(term) ||
          (lab.diagnosticServices &&
            lab.diagnosticServices.some((s) => s.toLowerCase().includes(term)));

        // State filter
        const matchState =
          selectedState === 'All' ||
          lab.address?.state?.toLowerCase() === selectedState.toLowerCase();

        // City filter
        const matchCity =
          selectedCity === 'All' ||
          lab.address?.city?.toLowerCase() === selectedCity.toLowerCase();

        // Ownership filter (Independent, Franchise, Chain)
        const matchOwnership =
          selectedOwnership === 'All' ||
          (lab.ownership &&
            lab.ownership.toLowerCase() === selectedOwnership.toLowerCase()) ||
          (lab.type && lab.type.toLowerCase() === selectedOwnership.toLowerCase());

        // Diagnostic Service filter
        const matchService =
          selectedService === 'All' ||
          (lab.diagnosticServices &&
            lab.diagnosticServices.some(
              (s) => s.toLowerCase() === selectedService.toLowerCase()
            ));

        // Minimum rating filter
        let matchRating = true;
        if (minRating === '4.0') {
          matchRating = (lab.googleRating || 0) >= 4.0;
        } else if (minRating === '4.5') {
          matchRating = (lab.googleRating || 0) >= 4.5;
        }

        return (
          matchSearch &&
          matchState &&
          matchCity &&
          matchOwnership &&
          matchService &&
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
    labsWithDistance,
    searchTerm,
    selectedState,
    selectedCity,
    selectedOwnership,
    selectedService,
    minRating,
    sortBy,
    userLocation
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedCity('All');
    setSelectedOwnership('All');
    setSelectedService('All');
    setMinRating('All');
    setSortBy('default');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedState !== 'All' ||
    selectedCity !== 'All' ||
    selectedOwnership !== 'All' ||
    selectedService !== 'All' ||
    minRating !== 'All' ||
    sortBy !== 'default';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section (Green Diagnostic Theme) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl text-emerald-600 mb-3 shadow-sm">
            <FaFlask className="text-3xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Diagnostic Laboratories Across India
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Find accredited pathology labs, advanced radiological scanning centers, and home sample
            collection services across India with transparent ratings and verified accreditations.
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
                  diagnostic lab.
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
                <FaLocationArrow className="text-emerald-600 text-base flex-shrink-0" />
                <span>
                  Enable your location to view exact distances to nearby pathology labs and scan
                  centers.
                </span>
              </div>
              <button
                type="button"
                onClick={() => requestLocation(true)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0"
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
              placeholder="Search labs by name, city, state or diagnostic service..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-800 text-sm transition"
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
              <FaFilter className="text-emerald-600" />
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
                  setSelectedCity('All');
                }}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {filterOptions.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Ownership Filter (Independent, Franchise, Chain) */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Ownership
              </label>
              <select
                value={selectedOwnership}
                onChange={(e) => setSelectedOwnership(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {filterOptions.ownerships.map((own) => (
                  <option key={own} value={own}>
                    {own}
                  </option>
                ))}
              </select>
            </div>

            {/* Diagnostic Services Filter */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {filterOptions.services.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
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
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
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

        {/* Dynamic Count Header (Section 7: "Showing 10 labs") */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700 text-sm font-medium">
            Showing <strong className="text-gray-900 font-bold">{filteredLabs.length}</strong> lab
            {filteredLabs.length !== 1 ? 's' : ''}
            {hasActiveFilters && <span className="text-gray-500 ml-1.5">(Filtered)</span>}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>NABL / CAP Verified Initial Network</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4" />
            <p className="text-gray-600 font-medium text-sm">Loading diagnostic laboratories...</p>
          </div>
        ) : filteredLabs.length > 0 ? (
          /* Three-Column Desktop Layout (Matching Screenshot) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab) => (
              <LabCard
                key={lab._id || lab.id}
                lab={lab}
                distance={lab.computedDistance}
                isFavorite={isFavorite(lab._id || lab.id, 'laboratory')}
                onFavoriteToggle={() => toggleFavorite(lab, 'laboratory')}
              />
            ))}
          </div>
        ) : (
          /* Empty Search & Filter State */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFlask className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Diagnostic Labs Found</h3>
            <p className="text-xs text-gray-500 mb-6">
              No diagnostic centres matched your search criteria. Try clearing some filters or searching
              for another city or service.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
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

export default Labs;
