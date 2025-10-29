"use client"
import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiEye, 
  FiEyeOff,
  FiUpload,
  FiCheck,
  FiArrowLeft,
  FiUserPlus,
  FiMapPin,
  FiGlobe,
  FiFileText,
  FiShoppingBag,
  FiAward,
  FiShield,
  FiTrendingUp,
  FiCalendar,
  FiCreditCard
} from 'react-icons/fi';

const Register = () => {
  const [step, setStep] = useState('role-select');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Customer fields
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    acceptTerms: false,
    
    // Vendor Store fields
    storeName: '',
    storeLogo: null,
    storeBio: '',
    country: '',
    city: '',
    website: '',
    facebook: '',
    instagram: '',
    
    // Vendor Verification fields
    tradeLicenseNumber: '',
    issuingAuthority: '',
    licenseExpiry: '',
    licenseFile: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleRoleSelect = (role) => {
    setUserType(role);
    setStep(role === 'customer' ? 'customer-signup' : 'vendor-signup');
  };

  const handleCustomerSignup = (e) => {
    e.preventDefault();
    console.log('Customer registration:', formData);
    // API call for customer registration
  };

  const handleVendorSignup = (e) => {
    e.preventDefault();
    console.log('Vendor registration:', formData);
    setStep('vendor-store');
  };

  const handleVendorStoreSubmit = (e) => {
    e.preventDefault();
    console.log('Vendor store profile:', formData);
    setStep('vendor-verification');
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log('Vendor verification:', formData);
    // API call for verification submission
  };

  const RoleSelection = () => (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="bg-white text-[#1e518e] p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiUserPlus className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Join TradeAuct</h1>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Choose your path and start your journey with us today
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Customer Card */}
          <div 
            onClick={() => handleRoleSelect('customer')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee]"></div>
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-100 transition-colors">
                  <FiUser className="h-8 w-8 text-[#1e518e]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Customer</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Discover amazing products, place bids, and shop with confidence in our secure marketplace.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Browse thousands of products', 'Place bids in real-time', 'Secure payment processing', 'Order tracking'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-[#1e518e] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white text-center py-4 rounded-xl font-semibold group-hover:from-[#1a4780] group-hover:to-[#005599] transition-all">
                  Start Shopping
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Card */}
          <div 
            onClick={() => handleRoleSelect('vendor')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee]"></div>
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-6 group-hover:bg-blue-100 transition-colors">
                  <FiShoppingBag className="h-8 w-8 text-[#1e518e]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Vendor</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Grow your business, reach new customers, and sell your products in our thriving marketplace.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Free vendor upgrade', 'Reach thousands of buyers', 'Powerful store dashboard', 'Secure transactions'].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-[#1e518e] mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white text-center py-4 rounded-xl font-semibold group-hover:from-[#1a4780] group-hover:to-[#005599] transition-all">
                  Start Selling
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-white">
            Already have an account?{' '}
            <a href="/login" className="text-white font-semibold hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  const CustomerSignup = () => (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setStep('role-select')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Join as Customer</h1>
              <p className="text-gray-600">Start your shopping journey</p>
            </div>
          </div>

          <form onSubmit={handleCustomerSignup} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone/WhatsApp *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Address (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
              <input
                type="checkbox"
                name="acceptTerms"
                required
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 rounded border-gray-300 text-[#1e518e] focus:ring-[#1e518e]"
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-[#1e518e] hover:underline font-semibold">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#1e518e] hover:underline font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white py-4 px-6 rounded-xl font-bold hover:from-[#1a4780] hover:to-[#005599] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Create Customer Account
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all hover:shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.67 3.51 7.72 9.05 7.2c1.95.33 3.35 1.51 4.03 1.51.68 0 2.37-1.22 4.18-1.04.71.03 2.68.29 3.94 2.22-.05.02-2.77 1.65-2.76 4.02.01 3.21 2.99 4.28 3.05 4.29-.03.08-.47 1.65-1.55 3.26zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const VendorSignup = () => (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setStep('role-select')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Vendor Account</h1>
              <p className="text-gray-600">Start your selling journey</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <FiAward className="h-6 w-6 text-[#1e518e] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-[#1e518e]">Free Vendor Upgrade</h4>
                <p className="text-[#1e518e] text-sm mt-1">
                  Start selling immediately after basic registration. Get verified later for the trusted badge.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleVendorSignup} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Business Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="business@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Business Phone *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Create secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
              <input
                type="checkbox"
                name="acceptTerms"
                required
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 rounded border-gray-300 text-[#1e518e] focus:ring-[#1e518e]"
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-[#1e518e] hover:underline font-semibold">
                  Vendor Agreement
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#1e518e] hover:underline font-semibold">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white py-4 px-6 rounded-xl font-bold hover:from-[#1a4780] hover:to-[#005599] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Continue to Store Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const VendorStoreProfile = () => (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setStep('vendor-signup')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Store Profile</h1>
              <p className="text-gray-600">Step 1: Set up your store</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#1e518e] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-[#1e518e]">Store Profile</div>
                <div className="text-xs text-gray-500">Required</div>
              </div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className="h-1 bg-[#1e518e] w-1/2"></div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-gray-500">Verification</div>
                <div className="text-xs text-gray-500">Optional</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleVendorStoreSubmit} className="space-y-6">
            {/* Store Logo */}
            <div className="text-center">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Store Logo
              </label>
              <div className="flex justify-center">
                <label className="relative cursor-pointer group">
                  <div className="w-32 h-32 border-3 border-dashed border-gray-300 rounded-2xl flex items-center justify-center group-hover:border-[#1e518e] transition-colors bg-gray-50">
                    {formData.storeLogo ? (
                      <img 
                        src={URL.createObjectURL(formData.storeLogo)} 
                        alt="Store logo" 
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <FiUpload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Upload Logo</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all flex items-center justify-center">
                    <FiUpload className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <input 
                    type="file" 
                    name="storeLogo"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Store Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Store Name *
              </label>
              <input
                type="text"
                name="storeName"
                required
                value={formData.storeName}
                onChange={handleInputChange}
                className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                placeholder="Enter your store name"
              />
            </div>

            {/* Store Bio */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Store Description *
              </label>
              <textarea
                name="storeBio"
                required
                rows={4}
                value={formData.storeBio}
                onChange={handleInputChange}
                className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all resize-none"
                placeholder="Tell customers about your store and products..."
              />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="Country"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="City"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <FiGlobe className="h-5 w-5 mr-2 text-[#1e518e]" />
                Social Links (Optional)
              </h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                  placeholder="https://yourstore.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                    placeholder="Facebook page URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                    placeholder="Instagram profile URL"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white py-4 px-6 rounded-xl font-bold hover:from-[#1a4780] hover:to-[#005599] transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Save Store Profile & Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const VendorVerification = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#1e518e] to-[#0061b0ee] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setStep('vendor-store')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">Vendor Verification</h1>
              <p className="text-gray-600">Step 2: Get verified badge (Optional)</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                <FiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-gray-900">Store Profile</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
            <div className="flex-1 h-1 bg-green-500 mx-4"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#1e518e] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-3">
                <div className="text-sm font-semibold text-[#1e518e]">Verification</div>
                <div className="text-xs text-gray-500">Optional</div>
              </div>
            </div>
          </div>

          {/* Success Alert */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 text-lg">Store Profile Complete!</h4>
                <p className="text-green-700 mt-2">
                  You can now start selling on TradeAuct. Submit verification documents to get the 
                  <span className="font-semibold"> "Verified Vendor" </span> 
                  badge and build trust with buyers.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <FiShield className="h-8 w-8 text-[#1e518e] mx-auto mb-2" />
              <h4 className="font-semibold text-[#1e518e]">Trust & Credibility</h4>
              <p className="text-[#1e518e] text-sm mt-1">Build buyer confidence</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <FiTrendingUp className="h-8 w-8 text-[#1e518e] mx-auto mb-2" />
              <h4 className="font-semibold text-[#1e518e]">More Sales</h4>
              <p className="text-[#1e518e] text-sm mt-1">Higher conversion rates</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <FiAward className="h-8 w-8 text-[#1e518e] mx-auto mb-2" />
              <h4 className="font-semibold text-[#1e518e]">Verified Badge</h4>
              <p className="text-[#1e518e] text-sm mt-1">Stand out from competitors</p>
            </div>
          </div>

          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            {/* Trade License Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Trade License Number
              </label>
              <input
                type="text"
                name="tradeLicenseNumber"
                value={formData.tradeLicenseNumber}
                onChange={handleInputChange}
                className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                placeholder="Enter license number"
              />
            </div>

            {/* Issuing Authority */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Issuing Authority
              </label>
              <input
                type="text"
                name="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={handleInputChange}
                className="block w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                placeholder="Name of issuing authority"
              />
            </div>

            {/* License Expiry */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                License Expiry Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e518e] focus:border-transparent bg-gray-50 transition-all"
                />
              </div>
            </div>

            {/* License File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Upload Trade License Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#1e518e] transition-colors bg-gray-50">
                <label className="cursor-pointer">
                  {formData.licenseFile ? (
                    <div className="text-center">
                      <FiFileText className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <p className="font-semibold text-gray-900">{formData.licenseFile.name}</p>
                      <p className="text-gray-500 text-sm mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-semibold text-gray-900">
                        Click to upload your trade license
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    name="licenseFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  // Skip verification and go to dashboard
                  console.log('Skipped verification');
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#1e518e] to-[#0061b0ee] text-white py-4 px-6 rounded-xl font-bold hover:from-[#1a4780] hover:to-[#005599] transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Submit for Verification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Render based on current step
  switch (step) {
    case 'role-select':
      return <RoleSelection />;
    case 'customer-signup':
      return <CustomerSignup />;
    case 'vendor-signup':
      return <VendorSignup />;
    case 'vendor-store':
      return <VendorStoreProfile />;
    case 'vendor-verification':
      return <VendorVerification />;
    default:
      return <RoleSelection />;
  }
};

export default Register;