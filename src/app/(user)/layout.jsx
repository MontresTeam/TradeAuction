"use client";

import Header from "../../../components/layout/Header";
import Footer from "../pages/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Global Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Global Footer */}
      <Footer className="mt-auto" />
    </div>
  );
}
