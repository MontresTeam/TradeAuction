"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import axios from "axios";

// ✅ Correct Toastify Import
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const OTPVerification = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const submitRef = useRef(null);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ✅ FIXED Toastify function
  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: type === "error" ? "#ef4444" : "#10b981",
        borderRadius: "8px",
        fontWeight: "600",
      },
    }).showToast();
  };

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if ((e.key === "Delete" || e.key === "Backspace") && index > 0) {
      if (!e.target.value) {
        const newInputs = [...inputs];
        newInputs[index - 1] = "";
        setInputs(newInputs);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1);
    setInputs(newInputs);

    if (value && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value && index === inputs.length - 1) {
      submitRef.current?.focus();
    }

    if (error) setError("");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    if (!/^[0-9]{4}$/.test(text)) {
      setError("Please paste exactly 4 digits");
      showToast("Please paste exactly 4 digits", "error");
      return;
    }

    setInputs(text.split(""));
    setTimeout(() => submitRef.current?.focus(), 0);
  };

  const handleFocus = (e) => e.target.select();

  const isFormValid = inputs.every((i) => i !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please enter all 4 digits");
      showToast("Please enter all 4 digits", "error");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const otp = inputs.join("");

      const res = await axios.post(
        "https://trdeoct-backend.onrender.com/api/auth/verify-otp/seller",
        { otp }
      );

      if (res.status === 200) {
        setSuccess("OTP verified successfully!");
        showToast("OTP verified successfully!", "success");

        setTimeout(() => router.push("/Seller"), 1500);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Verification failed. Try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/resend-otp/seller"
      );

      if (res.status === 200) {
        setInputs(["", "", "", ""]);
        setTimeLeft(300);
        setCanResend(false);
        showToast("New OTP sent to your WhatsApp!", "success");

        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to resend OTP. Try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="relative min-h-screen flex flex-col justify-center">
        <div className="max-w-md mx-auto bg-white px-6 py-8 rounded-xl shadow">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-7 h-7 text-indigo-600" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mb-2">
            Mobile Phone Verification
          </h1>
          <p className="text-center text-sm text-slate-500 mb-4">
            Enter the 4-digit code sent to your WhatsApp
          </p>

          {/* Timer */}
          <div className="flex justify-center items-center gap-2 text-sm mb-3">
            <FiClock className="w-4 h-4" />
            <span className="font-medium">Code expires in: {formatTime(timeLeft)}</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <FiAlertCircle className="text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <FiCheckCircle className="text-green-500" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-6">
              {inputs.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={v}
                  onChange={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onFocus={handleFocus}
                  onPaste={handlePaste}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-12 h-12 text-xl text-center font-bold bg-slate-100 rounded-lg border focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              ))}
            </div>

            <button
              ref={submitRef}
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                isFormValid && !loading
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>

          <div className="text-center text-sm text-slate-500 mt-4">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-indigo-500 font-medium hover:text-indigo-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            ) : (
              <>
                Resend OTP in{" "}
                <span className="text-indigo-500 font-medium">
                  {formatTime(timeLeft)}
                </span>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OTPVerification;
