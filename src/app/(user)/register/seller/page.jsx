"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const SellerRegistration = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1', // Default to US
    phone: '',
    password: '',
    confirmPassword: '',
    
    // ID Upload
    idType: 'Emirates ID',
    idDocument: null,
    idNumber: '',
    
    // Agreement
    agreeToTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [idPreview, setIdPreview] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [touchedFields, setTouchedFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  ];

  // Password validation rules
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('length');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('lowercase');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('uppercase');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('number');
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('special');
    }
    
    return errors;
  };

  const showToast = (message, type = 'info') => {
    const background = type === 'success' 
      ? 'linear-gradient(to right, #00b09b, #96c93d)'
      : type === 'error'
      ? 'linear-gradient(to right, #ff416c, #ff4b2b)'
      : 'linear-gradient(to right, #00b09b, #96c93d)';

    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      className: type,
      style: {
        background: background,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }
    }).showToast();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'idDocument' && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, idDocument: file }));
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setIdPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setIdPreview(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Validate password in real-time
      if (name === 'password') {
        const errors = validatePassword(value);
        setPasswordErrors(errors);
        setIsTypingPassword(true);
      }
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    if (fieldName === 'password') {
      setIsTypingPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.idDocument) {
      showToast('Please agree to terms and upload ID document', 'error');
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData for file upload
      const submitFormData = new FormData();
      
      // Append all form fields
      submitFormData.append('firstName', formData.firstName);
      submitFormData.append('lastName', formData.lastName);
      submitFormData.append('email', formData.email);
      submitFormData.append('countryCode', formData.countryCode);
      submitFormData.append('phone', formData.phone);
      submitFormData.append('password', formData.password);
      submitFormData.append('confirmPassword', formData.confirmPassword);
      submitFormData.append('idType', formData.idType);
      submitFormData.append('idNumber', formData.idNumber);
      submitFormData.append('main', formData.idDocument);


      // Send registration request with file
      const response = await axios.post(
        'http://localhost:8000/api/auth/register/seller',
        submitFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        showToast('Registration successful! Please check your WhatsApp for OTP and email for verification link.', 'success');
        
        // Redirect to OTP verification page after a short delay
        setTimeout(() => {
          router.push('/otpVerify'); // ✅ add leading slash
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your connection.';
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    // Validate step 1 before proceeding
    if (currentStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        showToast('Please fill in all required fields before proceeding.', 'error');
        return;
      }
      
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        showToast('Please fix password requirements before proceeding.', 'error');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match.', 'error');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const getPasswordStrength = () => {
    const errorCount = passwordErrors.length;
    const totalChecks = 5;
    const passedChecks = totalChecks - errorCount;
    
    if (formData.password.length === 0) {
      return { strength: 'Empty', color: 'gray', width: '0%', score: 0 };
    }
    
    const score = (passedChecks / totalChecks) * 100;
    
    if (score <= 40) return { strength: 'Weak', color: 'red', width: '40%', score };
    if (score <= 80) return { strength: 'Medium', color: 'yellow', width: '70%', score };
    return { strength: 'Strong', color: 'green', width: '100%', score };
  };

  const passwordStrength = getPasswordStrength();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password requirement checks
  const passwordChecks = [
    { key: 'length', label: 'At least 8 characters', met: formData.password.length >= 8 },
    { key: 'lowercase', label: 'One lowercase letter', met: /(?=.*[a-z])/.test(formData.password) },
    { key: 'uppercase', label: 'One uppercase letter', met: /(?=.*[A-Z])/.test(formData.password) },
    { key: 'number', label: 'One number', met: /(?=.*\d)/.test(formData.password) },
    { key: 'special', label: 'One special character (@$!%*?&)', met: /(?=.*[@$!%*?&])/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Become a Seller
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Join our platform and start selling your products to thousands of buyers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8 px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Step {currentStep} of 2
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              {currentStep === 1 && 'Personal Info'}
              {currentStep === 2 && 'ID & Agreement'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-2">
            <div 
              className="bg-blue-600 h-2.5 sm:h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm sm:shadow-md p-4 sm:p-6 lg:p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('firstName')}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('lastName')}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('email')}
                  required
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-28 sm:w-32 px-2 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('phone')}
                    required
                    className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('password')}
                      required
                      className="w-full px-3 py-2 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.829 3.829" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Professional Password Strength Indicator */}
                  {(isTypingPassword || formData.password) && (
                    <div className="mt-3 space-y-3">
                      {/* Strength Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">Password strength</span>
                          <span className={`text-xs font-semibold ${
                            passwordStrength.color === 'red' ? 'text-red-600' :
                            passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                            passwordStrength.color === 'green' ? 'text-green-600' :
                            'text-gray-600'
                          }`}>
                            {passwordStrength.strength}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              passwordStrength.color === 'red' ? 'bg-red-500' :
                              passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                              passwordStrength.color === 'green' ? 'bg-green-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: passwordStrength.width }}
                          ></div>
                        </div>
                      </div>

                      {/* Password Requirements Box */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                        {passwordChecks.map((check) => (
                          <div key={check.key} className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              check.met ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {check.met && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-xs ${
                              check.met ? 'text-green-700 font-medium' : 'text-gray-600'
                            }`}>
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={() => handleFieldBlur('confirmPassword')}
                      required
                      className={`w-full px-3 py-2 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword 
                          ? 'border-red-300 bg-red-50' 
                          : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.829 3.829" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Passwords do not match
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-600 text-xs mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Passwords match
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: ID Verification & Agreement */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Verification & Agreement</h2>
              
              {/* ID Verification Section */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">ID Verification</h3>
                
                <div>
                  <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Type *
                  </label>
                  <select
                    id="idType"
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Emirates ID">Emirates ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Number *
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('idNumber')}
                    required
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your ID number"
                  />
                </div>

                <div>
                  <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload ID Document *
                  </label>
                  
                  {/* Document Preview */}
                  {idPreview && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Document Preview:</p>
                      <div className="flex items-center justify-center">
                        <img 
                          src={idPreview} 
                          alt="ID preview" 
                          className="max-h-40 max-w-full object-contain rounded border border-gray-300"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Document uploaded successfully
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, idDocument: null }));
                            setIdPreview(null);
                          }}
                          className="text-xs text-red-600 hover:text-red-800 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex flex-col sm:flex-row text-sm text-gray-600 items-center justify-center gap-1">
                        <label
                          htmlFor="idDocument"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="idDocument"
                            name="idDocument"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleInputChange}
                            required={!idPreview}
                            className="sr-only"
                          />
                        </label>
                        <p className="text-gray-500">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Agreement Section */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-yellow-800 mb-2 sm:mb-3">Important Payment Information</h3>
                <div className="space-y-2 text-xs sm:text-sm text-yellow-700">
                  <p className="font-semibold">By registering as a seller, you agree to the following payment terms:</p>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>All customer payments will be processed through TradeOct (Stripe)</li>
                    <li>Funds will be held by TradeOct until order completion</li>
                    <li>Payouts will be made by admin after successful order delivery</li>
                    <li>Standard processing time for payouts is 3-7 business days after order completion</li>
                    <li>TradeOct may hold funds for verification or in case of disputes</li>
                  </ul>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <label className="flex items-start space-x-2 sm:space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-0.5 sm:mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
                    I agree to the <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>, 
                    <button type="button" className="text-blue-600 hover:underline ml-1">Privacy Policy</button>, and the payment 
                    terms mentioned above. I understand that all payments will be processed through TradeOct and payouts 
                    will be made by admin after order completion.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={isLoading}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.agreeToTerms || !formData.idDocument || isLoading}
                className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            )}
          </div>
        </form>

        {/* Footer Info */}
        <div className="text-center mt-4 sm:mt-6 px-2">
          <p className="text-xs sm:text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;