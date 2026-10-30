import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaFlask,
  FaMapMarkerAlt,
  FaStar,
  FaPhoneAlt,
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
  FaExchangeAlt,
  FaCheck
} from 'react-icons/fa';
import { useComparison } from '../context/ComparisonContext';
import { openGoogleMaps } from '../utils/maps';
import { formatDistance } from '../utils/calculateDistance';
import CallModal from './CallModal';

const LabCard = ({ lab, distance, isFavorite, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  let comparison = null;
  try {
    comparison = useComparison();
  } catch (error) {
    console.warn('Comparison context not available');
  }

  const addToComparison = comparison?.addToComparison || (() => {});
  const removeFromComparison = comparison?.removeFromComparison || (() => {});
  const isInComparison = comparison?.isInComparison || (() => false);

  const labId = lab._id || lab.id;
  const isCompared = isInComparison(labId);

  const images = lab.images && lab.images.length > 0
    ? lab.images
    : ['/images/labs/lab-fallback.svg'];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(labId);
    } else {
      addToComparison(lab, 'laboratory');
    }
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    setIsCallModalOpen(true);
  };

  const handleMapClick = (e) => {
    e.stopPropagation();
    openGoogleMaps(lab);
  };

  const handleCardClick = () => {
    navigate(`/lab/${labId}`);
  };

  const displayDistance = distance !== null && distance !== undefined
    ? formatDistance(distance)
    : lab.distance !== undefined && lab.distance !== null
    ? formatDistance(lab.distance)
    : null;

  const displayAddress = [
    lab.address?.area,
    lab.address?.city,
    lab.address?.state
  ]
    .filter(Boolean)
    .join(', ');

  const ownershipLabel = lab.ownership || lab.category || 'Chain';

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100 cursor-pointer"
      >
        {/* A. Image Section (Green Tinted) */}
        <div className="relative h-56 bg-emerald-50 overflow-hidden flex-shrink-0">
          {!imageError ? (
            <img
              src={images[currentImageIndex] || '/images/labs/lab-fallback.svg'}
              alt={lab.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-500">
              <FaFlask className="text-5xl mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Diagnostic Laboratory
              </span>
            </div>
          )}

          {/* Gradient Overlay for Top Badges */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Top-Left: Distance Badge */}
          {displayDistance && (
            <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-10">
              <FaMapMarkerAlt className="text-[10px]" />
              <span>{displayDistance}</span>
            </div>
          )}

          {/* Top-Right: White Circular Favourite Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.(lab._id || lab.id, lab);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-10"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-base" />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-red-500 text-base" />
            )}
          </button>

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md transition-opacity opacity-80 md:opacity-0 md:group-hover:opacity-100 z-10"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md transition-opacity opacity-80 md:opacity-0 md:group-hover:opacity-100 z-10"
              >
                <FaChevronRight className="text-xs" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex ? 'w-5 bg-white shadow' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* B. Laboratory Information Section */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {lab.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3.5">
            <FaMapMarkerAlt className="text-emerald-600 flex-shrink-0 text-sm" />
            <span className="line-clamp-1">{displayAddress}</span>
          </div>

          {/* Ratings Row: Google & App Ratings */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <FaStar className="text-amber-400 text-xs" />
                <span className="font-bold text-gray-900 text-sm">
                  {lab.googleRating ? Number(lab.googleRating).toFixed(1) : 'N/A'}
                </span>
                {lab.googleReviewCount ? (
                  <span className="text-gray-500 text-xs">
                    ({Number(lab.googleReviewCount).toLocaleString()})
                  </span>
                ) : null}
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Google Reviews</p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-0.5">
                <FaStar className="text-blue-500 text-xs" />
                <span className="font-bold text-gray-900 text-sm">
                  {lab.appRating ? Number(lab.appRating).toFixed(1) : '5.0'}
                </span>
                <span className="text-gray-500 text-xs">
                  ({lab.appReviewCount || 38})
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">App Reviews</p>
            </div>
          </div>

          {/* Ownership & Diagnostic Category Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5 mt-auto">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-[11px] font-bold uppercase tracking-wider">
              {ownershipLabel}
            </span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-semibold line-clamp-1">
              {lab.category || 'Diagnostic Lab'}
            </span>
          </div>

          {/* C. Action Buttons */}
          <div className="space-y-2 pt-1">
            {/* 1. Large GREEN View Details Button (Matching Reference Screenshot) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm text-sm"
            >
              View Details
            </button>

            {/* Bottom 3-Action Grid: Compare (Orange), Call (Green), Map (Purple) */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleCompareToggle}
                className={`py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition border ${
                  isCompared
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
                }`}
              >
                {isCompared ? <FaCheck className="text-xs" /> : <FaExchangeAlt className="text-xs" />}
                <span>{isCompared ? 'Added' : 'Compare'}</span>
              </button>

              <button
                type="button"
                onClick={handleCallClick}
                className="py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call</span>
              </button>

              <button
                type="button"
                onClick={handleMapClick}
                className="py-2 px-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition"
              >
                <FaMapMarkerAlt className="text-xs" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        facility={lab}
        type="laboratory"
      />
    </>
  );
};

export default LabCard;
