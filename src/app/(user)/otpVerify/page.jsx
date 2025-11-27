"use client"
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'toastify-js';

const OTPVerification = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);
  const submitRef = useRef(null);

  useEffect(() => {
    // Initialize refs
    inputRefs.current = inputRefs.current.slice(0, 4);
    
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (index > 0 && !e.target.value) {
        const newInputs = [...inputs];
        newInputs[index - 1] = '';
        setInputs(newInputs);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newInputs = [...inputs];
    
    // If user pastes multiple digits, take only the first one
    if (value.length > 1) {
      newInputs[index] = value.charAt(0);
    } else {
      newInputs[index] = value;
    }
    
    setInputs(newInputs);

    // Auto-focus next input
    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value && index === inputs.length - 1) {
      submitRef.current?.focus();
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    
    if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
      setError('Please paste exactly 4 digits');
      showToast('Please paste exactly 4 digits', 'error');
      return;
    }
    
    const digits = text.split('').slice(0, inputs.length);
    setInputs(digits);
    
    // Focus the submit button after paste
    setTimeout(() => {
      submitRef.current?.focus();
    }, 0);
    
    // Clear error
    setError('');
  };

  // Fixed toast function
  const showToast = (message, type = 'success') => {
    toast(message, {
      position: 'top-center',
      duration: 3000,
      className: type === 'error' ? 'toastify-error' : 'toastify-success'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError('Please enter all 4 digits');
      showToast('Please enter all 4 digits', 'error');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const otp = inputs.join('');
      
      const response = await axios.post('http://localhost:8000/api/auth/verify-otp/seller', {
        otp: otp
      });

      if (response.status === 200) {
        setSuccess('OTP verified successfully!');
        showToast('OTP verified successfully!', 'success');
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          router.push('/SellerDashboard');
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Verification failed. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    
    if (!canResend) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/resend-otp/seller');
      
      if (response.status === 200) {
        setTimeLeft(300); // Reset to 5 minutes
        setCanResend(false);
        setInputs(['', '', '', '']);
        setSuccess('New OTP sent successfully!');
        
        showToast('New OTP sent to your WhatsApp!', 'success');
        
        // Focus first input
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = inputs.every(input => input !== '') && !loading;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative font-inter antialiased">
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-24">
            <div className="flex justify-center">
              <div className="w-full max-w-md mx-auto text-center bg-white px-4 sm:px-6 md:px-8 py-8 md:py-10 rounded-xl shadow-sm md:shadow">
                <header className="mb-6 md:mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold mb-2 text-slate-900">
                    Mobile Phone Verification
                  </h1>
                  <p className="text-sm md:text-[15px] text-slate-500 mb-4 leading-relaxed">
                    Enter the 4-digit verification code sent to your WhatsApp
                  </p>
                  
                  {/* Timer */}
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-600 mb-4">
                    <FiClock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">Code expires in: {formatTime(timeLeft)}</span>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2">
                      <FiAlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-xs md:text-sm font-medium">{error}</span>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-green-700 text-xs md:text-sm font-medium">{success}</span>
                    </div>
                  )}
                </header>

                <form id="otp-form" onSubmit={handleSubmit}>
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-6">
                    {inputs.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        value={value}
                        disabled={loading}
                        className={`
                          w-12 h-12 md:w-14 md:h-14 
                          text-center text-xl md:text-2xl font-extrabold 
                          text-slate-900 bg-slate-100 
                          border border-transparent hover:border-slate-200 
                          appearance-none rounded-lg md:rounded p-3 md:p-4 
                          outline-none 
                          focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 
                          transition-all duration-200
                          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                          ${error ? 'border-red-300 bg-red-50' : ''}
                          ${success ? 'border-green-300 bg-green-50' : ''}
                        `}
                        pattern="\d*"
                        maxLength="1"
                        onChange={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={handleFocus}
                        onPaste={handlePaste}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                      />
                    ))}
                  </div>

                  <div className="max-w-[260px] mx-auto mb-4">
                    <button
                      ref={submitRef}
                      type="submit"
                      disabled={!isFormValid || loading}
                      className={`
                        w-full inline-flex justify-center items-center 
                        whitespace-nowrap rounded-lg px-4 py-3 md:px-3.5 md:py-2.5 
                        text-sm font-medium text-white 
                        shadow-sm shadow-indigo-950/10 
                        focus:outline-none focus:ring-2 focus:ring-indigo-300 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 
                        transition-colors duration-200
                        ${isFormValid && !loading
                          ? 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700'
                          : 'bg-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Verifying...
                        </>
                      ) : (
                        'Verify Account'
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-xs md:text-sm text-slate-500">
                  {canResend ? (
                    <span>
                      Didn't receive code?{' '}
                      <button
                        onClick={handleResend}
                        disabled={loading}
                        className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {loading ? 'Sending...' : 'Resend OTP'}
                      </button>
                    </span>
                  ) : (
                    <span>
                      Resend OTP in{' '}
                      <span className="font-medium text-indigo-500">
                        {formatTime(timeLeft)}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast container */}
      <style jsx global>{`
        .toastify {
          font-family: inherit;
          border-radius: 8px;
          font-weight: 500;
        }
        .toastify-success {
          background: #10b981;
        }
        .toastify-error {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default OTPVerification;