import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaCalendarCheck,
  FaUserCircle,
  FaPlus,
  FaUserShield
} from 'react-icons/fa';
import axios from 'axios';
import API_URL from '../config/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const DEFAULT_ADMIN_EMAIL = 'admin@hospital.com';

  useEffect(() => {
    if (user && user.role === 'user') {
      fetchUnreadAppointments();
    }
  }, [user]);

  const fetchUnreadAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/appointments/my-appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const unread = response.data.data.filter(
        (apt) => apt.status === 'confirmed' || apt.status === 'pending'
      ).length;
      setUnreadCount(unread);
    } catch (error) {
      // Backend not running locally or auth error
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminLoginTime');
    window.location.href = '/';
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      const loginTime = localStorage.getItem('adminLoginTime');
      const ONE_HOUR = 60 * 60 * 1000;

      if (!loginTime) {
        localStorage.setItem('adminLoginTime', Date.now().toString());
      } else {
        const timePassed = Date.now() - parseInt(loginTime);

        if (timePassed >= ONE_HOUR) {
          alert('Admin session expired for security reasons. Please login again.');
          handleLogout();
        } else {
          const timeLeft = ONE_HOUR - timePassed;
          const timer = setTimeout(() => {
            alert('Admin session expired for security reasons. Please login again.');
            handleLogout();
          }, timeLeft);

          return () => clearTimeout(timer);
        }
      }
    }
  }, [user]);

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/admin/create-admin`,
        newAdminData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ New Admin Created Successfully');
      setShowAddAdminModal(false);
      setNewAdminData({ name: '', email: '', phone: '', password: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setAdminLoading(false);
    }
  };

  // Helper for active navigation link styling
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
      isActive(path)
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-700 hover:text-blue-600 border-transparent'
    }`;

  const mobileNavLinkClass = (path) =>
    `block py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
      isActive(path)
        ? 'bg-blue-50 text-blue-600 font-bold'
        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
    }`;

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo & Tagline */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="MedNexus"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight leading-none">
                  MedNexus
                </h1>
                <p className="text-[11px] text-gray-500 font-medium hidden sm:block tracking-normal mt-0.5">
                  The smarter way to choose your care
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7">
              <Link to="/" className={navLinkClass('/')}>
                Home
              </Link>
              <Link to="/hospitals" className={navLinkClass('/hospitals')}>
                Hospitals
              </Link>
              <Link to="/labs" className={navLinkClass('/labs')}>
                Labs
              </Link>

              {(!user || user.role !== 'admin') && (
                <Link to="/contact" className={navLinkClass('/contact')}>
                  Contact
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-4 ml-2">
                  {/* User Role Actions */}
                  {user.role === 'user' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate('/favorites')}
                        className="p-2 hover:text-red-500 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                        title="Favorites"
                      >
                        <FaHeart className="text-lg" />
                      </button>
                      <button
                        onClick={() => navigate('/appointments')}
                        className="relative p-2 hover:text-blue-600 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                        title="My Appointments"
                      >
                        <FaCalendarCheck className="text-lg" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => navigate('/submit-facility')}
                        className="p-2 hover:text-blue-600 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                        title="Submit Facility"
                      >
                        <FaPlus className="text-base" />
                      </button>
                    </div>
                  )}

                  {/* Admin Dashboard */}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="text-sm font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition"
                    >
                      Admin Panel
                    </Link>
                  )}

                  {/* Owner Dashboard */}
                  {user.role === 'owner' && (
                    <Link
                      to="/owner/dashboard"
                      className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition"
                    >
                      Owner Dashboard
                    </Link>
                  )}

                  {/* User Dropdown */}
                  <div className="relative pl-3 border-l border-gray-200" ref={dropdownRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-gray-100 rounded-xl transition"
                    >
                      <FaUserCircle className="text-2xl text-gray-600" />
                      <span className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                        {user.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase">
                            {user.role}
                          </span>
                        </div>

                        <div className="py-1">
                          <button
                            onClick={() => {
                              navigate('/profile');
                              setShowUserMenu(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                          >
                            <FaUser className="text-gray-400" /> Profile
                          </button>

                          {user.email === DEFAULT_ADMIN_EMAIL && (
                            <button
                              onClick={() => {
                                setShowAddAdminModal(true);
                                setShowUserMenu(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-purple-700 font-medium hover:bg-purple-50 flex items-center gap-3"
                            >
                              <FaUserShield className="text-purple-500" /> Add Admin
                            </button>
                          )}
                        </div>

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-semibold"
                          >
                            <FaSignOutAlt className="text-red-500" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-lg animate-fade-in">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/')}>
              Home
            </Link>
            <Link
              to="/hospitals"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass('/hospitals')}
            >
              Hospitals
            </Link>
            <Link
              to="/labs"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass('/labs')}
            >
              Labs
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass('/contact')}
            >
              Contact
            </Link>

            {user ? (
              <div className="pt-3 border-t border-gray-100">
                <div className="px-3 py-2">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      navigate('/favorites');
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2 border rounded-lg text-sm text-gray-700"
                  >
                    <FaHeart className="text-red-500" /> Favorites
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2 border rounded-lg text-sm text-gray-700"
                  >
                    <FaUser /> Profile
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-600 text-white py-2.5 rounded-lg font-bold text-sm shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 border border-blue-600 text-blue-600 rounded-xl font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Admin Creation Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUserShield className="text-purple-600 text-lg" />
                </div>
                Create Admin
              </h2>
              <button
                onClick={() => setShowAddAdminModal(false)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleAddAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                  className="w-full border border-gray-300 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter admin's full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                  className="w-full border border-gray-300 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="admin@mednexus.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newAdminData.phone}
                  onChange={(e) => setNewAdminData({ ...newAdminData, phone: e.target.value })}
                  className="w-full border border-gray-300 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  required
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                  className="w-full border border-gray-300 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-purple-700 transition disabled:opacity-70 flex justify-center items-center gap-2 shadow-md"
                >
                  {adminLoading ? 'Creating...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
