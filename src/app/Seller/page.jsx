// app/vendor/page.jsx
import Image from 'next/image';
import newCurrency from '../../assets/newSymbole.png';

const SellerDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const statsData = {
    yesterday: {
      revenue: -1014,
      orders: -31,
      views: -3
    },
    thisMonth: {
      totalRevenue: 3555,
      perOrder: 1777,
      commissionFee: 352,
      itemsSold: 2,
      credit: 0
    },
    upcomingPayouts: {
      trustedCheckouts: 15021,
      directPayments: 0,
      trustedCount: 4,
      directCount: 0
    },
    dealerPackage: {
      name: "PROFESSIONAL-100",
      price: "€629",
      listings: 75,
      maxListings: 105,
      status: "active"
    },
    performance: {
      sentOnTime: 12.59,
      sentLate: 0.00,
      cancelled: 0.00,
      expected: 12.59
    },
    handlingTime: {
      inStock: 0.6,
      previousMonth: 0.3,
      needsProcurement: "Item needs to be procured",
      availableOnRequest: "Item available on request"
    },
    listingQuality: 63,
    averageQuality: 70
  };

  // Currency display component
  const CurrencyDisplay = ({ amount, className = "" }) => (
    <div className={`flex items-center ${className}`}>
      <Image 
        src={newCurrency} 
        alt="Currency" 
        width={16} 
        height={16}
        className="w-4 h-4 mr-1"
      />
      <span>{amount}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header with Brand */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TO</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">TradeOct Auction</h1>
          </div>
       
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Image 
              src={newCurrency} 
              alt="Currency" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
           
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium whitespace-nowrap shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          Dashboard
        </button>
        <button className="px-4 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 whitespace-nowrap hover:border-gray-300 transition-colors flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Messages
        </button>
        <button className="px-4 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 whitespace-nowrap hover:border-gray-300 transition-colors flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Listings
        </button>
        <button className="px-4 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 whitespace-nowrap hover:border-gray-300 transition-colors flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Orders
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
              <div className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                Live Updates
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Yesterday</h3>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <p className="text-red-500 font-bold text-2xl">{statsData.yesterday.revenue}*</p>
                  <p className="text-sm text-gray-500 mt-1">Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-red-500 font-bold text-2xl">{statsData.yesterday.orders}*</p>
                  <p className="text-sm text-gray-500 mt-1">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-red-500 font-bold text-2xl">{statsData.yesterday.views}*</p>
                  <p className="text-sm text-gray-500 mt-1">Views</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">*from the day before yesterday</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">This Month</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-gray-500 text-sm mb-2">Total revenue</p>
                  <div className="flex items-center">
                    <CurrencyDisplay amount={statsData.thisMonth.totalRevenue} className="text-2xl font-bold text-gray-800" />
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <CurrencyDisplay amount={statsData.thisMonth.perOrder} className="text-sm" />
                    <span className="ml-1">per order</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <p className="text-gray-500 text-sm mb-2">Commission fee</p>
                  <div className="flex items-center">
                    <CurrencyDisplay amount={statsData.thisMonth.commissionFee} className="text-2xl font-bold text-gray-800" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">Items sold {statsData.thisMonth.itemsSold}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-gray-500 text-sm mb-2">Credit</p>
                  <div className="flex items-center">
                    <CurrencyDisplay amount={statsData.thisMonth.credit} className="text-2xl font-bold text-gray-800" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">Credit {statsData.thisMonth.credit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Performance</h2>
              <p className="text-gray-500 text-sm">1 November 2025 - Yesterday</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Dealer Program</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 text-center">
                  <div className="flex justify-center items-center">
                    <CurrencyDisplay amount={statsData.performance.sentOnTime} className="text-lg font-bold text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Sent on time</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                  <div className="flex justify-center items-center">
                    <CurrencyDisplay amount={statsData.performance.sentLate} className="text-lg font-bold text-gray-700" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Sent late</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                  <div className="flex justify-center items-center">
                    <CurrencyDisplay amount={statsData.performance.cancelled} className="text-lg font-bold text-gray-700" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Cancelled</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 text-center">
                  <div className="flex justify-center items-center">
                    <CurrencyDisplay amount={statsData.performance.expected} className="text-lg font-bold text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Expected</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Handling time</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div>
                    <p className="text-gray-800 font-medium">Item is in stock</p>
                    <p className="text-gray-500 text-sm">October 2025: {statsData.handlingTime.previousMonth} days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{statsData.handlingTime.inStock} days</p>
                    <div className="w-20 bg-blue-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(statsData.handlingTime.inStock / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-gray-800 font-medium">{statsData.handlingTime.needsProcurement}</p>
                  <p className="text-gray-500 text-sm mt-1">October 2025:</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-gray-800 font-medium">{statsData.handlingTime.availableOnRequest}</p>
                  <p className="text-gray-500 text-sm mt-1">October 2025:</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Payouts */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Payouts</h2>
            
            <div className="mb-6 p-4 bg-white rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <CurrencyDisplay amount={statsData.upcomingPayouts.trustedCheckouts} className="text-3xl font-bold text-gray-800" />
                  </div>
                  <p className="text-gray-600 mt-2">{statsData.upcomingPayouts.trustedCount} Trusted Checkouts</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <CurrencyDisplay amount={statsData.upcomingPayouts.directPayments} className="text-2xl font-bold text-gray-600" />
                  </div>
                  <p className="text-gray-500 mt-2">{statsData.upcomingPayouts.directCount} Direct payments</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dealer Package */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Dealer package</h2>
            
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-800">{statsData.dealerPackage.name}</p>
              <p className="text-gray-600">{statsData.dealerPackage.price}/month</p>
            </div>
            
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Listings Usage</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-blue-600">{statsData.dealerPackage.listings}</span>
                <span className="text-gray-500">of {statsData.dealerPackage.maxListings}</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${(statsData.dealerPackage.listings / statsData.dealerPackage.maxListings) * 100}%` }}
                ></div>
              </div>
              <p className="text-green-600 font-medium text-sm mt-2 flex items-center gap-1">
                <span>✅</span> Within package limits
              </p>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-sm border border-emerald-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tasks</h2>
            <div className="bg-white p-5 rounded-xl border border-emerald-200 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 text-2xl">✓</span>
              </div>
              <p className="text-emerald-700 font-medium text-lg">Great! You have no open tasks.</p>
              <p className="text-emerald-600 text-sm mt-1">Everything is up to date</p>
            </div>
          </div>

          {/* Listing Quality */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-sm border border-purple-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Listing Quality</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-3xl font-bold text-purple-600">{statsData.listingQuality}%</span>
                <span className="text-gray-500 text-sm bg-white px-2 py-1 rounded-full">
                  Avg: {statsData.averageQuality}%
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-purple-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-violet-600 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${statsData.listingQuality}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-violet-700 transition-all shadow-sm flex items-center justify-center gap-2">
              <span>Review listings</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Brand */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">TO</span>
          </div>
          <span className="text-gray-600 text-sm">TradeOct Auction</span>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;