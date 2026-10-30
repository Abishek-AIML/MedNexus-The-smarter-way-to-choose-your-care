import React from 'react';
import { FaPhoneAlt, FaTimes, FaExclamationTriangle, FaShieldAlt, FaCopy, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

/**
 * Reusable contact display and call modal component.
 * Strict safety rules:
 * - Visually marks demo numbers as DEMO / NOT VERIFIED.
 * - Does not trigger `tel:` calls for synthetic / fictional placeholder numbers.
 * - Enables direct dialing only after a real number has been verified.
 */
const CallModal = ({ isOpen, onClose, facility, type = 'hospital' }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !facility) return null;

  const isDemo = facility.isDemoContact || (facility.phone && facility.phone.includes('DEMO'));
  const phone = facility.phone || 'Contact not listed';
  const emergencyPhone = facility.emergencyDetails?.contactNumber || null;

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    toast.success('Number copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifiedCall = () => {
    if (!isDemo && phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              type === 'hospital' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <FaPhoneAlt className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{facility.name}</h3>
            <p className="text-xs text-gray-500">
              {facility.address?.city}, {facility.address?.state}
            </p>
          </div>
        </div>

        {/* Demo Warning / Notice */}
        {isDemo ? (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <FaExclamationTriangle className="text-amber-600 text-lg flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Demo Listing — Synthetic Contact</h4>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    This contact is a simulated demonstration placeholder. Direct telephonic dialing
                    is disabled to prevent accidental calls to unverified numbers.
                  </p>
                </div>
              </div>
            </div>

            {/* Display Number */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wider mb-1.5">
                DEMO / NOT VERIFIED
              </span>
              <div className="text-2xl font-mono font-bold text-gray-800 tracking-wide">
                {phone}
              </div>
              <p className="text-xs text-gray-500 mt-1">Official line pending operator verification</p>
            </div>

            {/* Emergency Helpline note if present */}
            {emergencyPhone && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-red-500 text-base" />
                  <div>
                    <p className="text-xs font-bold text-red-900">National / Emergency Hotline</p>
                    <p className="text-xs text-red-700">{emergencyPhone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-300 font-semibold text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
                {copied ? 'Copied' : 'Copy Number'}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Verified Phone Call Interface */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-600 text-lg" />
                <span className="text-sm font-bold text-emerald-900">Verified Contact Number</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">{phone}</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifiedCall}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 shadow-md"
              >
                <FaPhoneAlt /> Call Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallModal;
