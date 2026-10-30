import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaFlask,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaHome,
  FaAward,
  FaCalendarCheck,
  FaMapMarkedAlt
} from 'react-icons/fa';
import Footer from '../components/Footer';
import labService from '../services/labService';
import { openGoogleMaps } from '../utils/maps';
import CallModal from '../components/CallModal';

const EnhancedLabDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLabDetails();
  }, [id]);

  const fetchLabDetails = async () => {
    try {
      setLoading(true);
      const data = await labService.getLabById(id);
      setLab(data);
    } catch (error) {
      console.error('Error fetching lab details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-emerald-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading laboratory details...</p>
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <FaFlask className="text-5xl text-gray-400 mb-3" />
        <h2 className="text-xl font-bold text-gray-800">Laboratory Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The laboratory record could not be loaded.</p>
        <button
          onClick={() => navigate('/labs')}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700"
        >
          Back to Labs Directory
        </button>
      </div>
    );
  }

  const images = lab.images && lab.images.length > 0
    ? lab.images
    : ['/images/labs/lab-fallback.svg'];

  const displayAddress = [
    lab.address?.street,
    lab.address?.area,
    lab.address?.city,
    lab.address?.state,
    lab.address?.pincode
  ]
    .filter(Boolean)
    .join(', ');

  const diagnosticServices = lab.diagnosticServices || [
    'Blood Tests',
    'Pathology',
    'Clinical Biochemistry',
    'Digital X-Ray',
    'Ultrasound'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate('/labs')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 mb-6 group"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          <span>Back to All Laboratories</span>
        </button>

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Gallery Column */}
            <div className="lg:col-span-5 bg-emerald-950 p-4 sm:p-6 flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner bg-emerald-900/40">
                <img
                  src={images[activeImageIndex]}
                  alt={lab.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/labs/lab-fallback.svg';
                  }}
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  {lab.ownership || lab.category || 'Chain'}
                </span>
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                        idx === activeImageIndex
                          ? 'border-emerald-400 scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {lab.type || 'Diagnostic Lab'}
                  </span>
                  {lab.homeCollection && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                      <FaHome className="text-xs" />
                      Home Collection Available
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                  {lab.name}
                </h1>

                <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                  <FaMapMarkerAlt className="text-emerald-600 mt-1 flex-shrink-0" />
                  <span>{displayAddress}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">{lab.description}</p>

                {/* Rating Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <FaStar className="text-amber-400 text-sm" />
                      <span className="font-bold text-gray-900 text-base">
                        {lab.googleRating ? Number(lab.googleRating).toFixed(1) : '4.5'}
                      </span>
                      {lab.googleReviewCount && (
                        <span className="text-gray-500 text-xs">({lab.googleReviewCount})</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">Google Verified</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <FaStar className="text-blue-500 text-sm" />
                      <span className="font-bold text-gray-900 text-base">
                        {lab.appRating ? Number(lab.appRating).toFixed(1) : '4.8'}
                      </span>
                      <span className="text-gray-500 text-xs">({lab.appReviewCount || 42})</span>
                    </div>
                    <span className="text-xs text-gray-500">App Patient Reviews</span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-1 mb-1 text-emerald-700 font-bold text-sm">
                      <FaAward className="text-base" />
                      <span>Accredited</span>
                    </div>
                    <span className="text-xs text-gray-500">NABL / ISO Standards</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition"
                >
                  <FaPhoneAlt /> Call Laboratory
                </button>

                <button
                  onClick={() => openGoogleMaps(lab)}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-sm transition"
                >
                  <FaMapMarkedAlt /> View on Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Services Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFlask className="text-emerald-600" />
                Available Diagnostic Services & Tests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diagnosticServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100"
                  >
                    <FaCheckCircle className="text-emerald-600 text-sm flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Accreditation Assurance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-emerald-600" />
                Accreditation & Quality Standards
              </h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>NABL / CAP Certified:</strong> Adheres to International Organization for
                    Standardization (ISO 15189) clinical testing guidelines.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Digital Reporting:</strong> Download test reports online directly through
                    secure SMS and email links within 24 hours.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Cold-Chain Sample Transport:</strong> Safe sample logistics maintaining
                    temperature-controlled integrity for all blood assays.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Sidebar: Operating Hours & Quick Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaClock className="text-emerald-600" />
                Operating Hours
              </h3>
              <div className="space-y-2 text-xs">
                {lab.operatingHours ? (
                  Object.entries(lab.operatingHours).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0 capitalize"
                    >
                      <span className="font-semibold text-gray-700">{day}</span>
                      <span className="text-gray-500 font-mono">{hours}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-gray-500">07:00 AM – 08:30 PM (Mon – Sat)</div>
                )}
              </div>
            </div>

            {/* Synthetic / Demo Contact Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wider mb-2">
                Demo Network Notice
              </span>
              <p className="text-xs text-amber-800 leading-relaxed">
                Branch phone listings and test pricing are illustrative samples for the MedNexus
                discovery demo. Please verify emergency availability locally before critical visits.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Call Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        facility={lab}
        type="laboratory"
      />

      <Footer />
    </div>
  );
};

export default EnhancedLabDetails;
