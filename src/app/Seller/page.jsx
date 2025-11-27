// app/vendor/page.jsx

const VendorDashboard = () => {
  return (
  
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Your dashboard content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">$12,456</p>
          </div>
          
          {/* Add more content... */}
        </div>
      </div>
   
  );
};

export default VendorDashboard;