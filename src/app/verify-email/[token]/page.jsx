"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
  const params = useParams();
  const token = params.token;
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/auth/verify-email/${token}`);
        setMessage(res.data.message);
        setVerified(true);
      } catch (err) {
        setMessage(err.response?.data?.message || "Email verification failed");
      }
    };

    verifyEmail();
  }, [token]);

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">
        {message}
      </h1>

      {verified && (
        <button
          onClick={goToLogin}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 w-full sm:w-auto text-center"
        >
          Go to Login
        </button>
      )}
    </div>
  );
}
