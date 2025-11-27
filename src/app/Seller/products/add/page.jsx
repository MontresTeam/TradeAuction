"use client"
import React, { useState } from 'react';
import { 
  FiUpload, 
  FiImage, 
  FiDollarSign, 
  FiFileText,
  FiX,
  FiPlus,
  FiClock,
  FiAward,
  FiTruck,
  FiWatch,
  FiCalendar,
  FiCheck,
  FiAlertCircle,
  FiDroplet,
  FiSettings
} from 'react-icons/fi';

const UploadProduct = () => {
  const [productData, setProductData] = useState({
    // Basic Information
    name: '',
    description: '',
    shortDescription: '',
    
    // Watch Specific Details
    brand: '',
    model: '',
    sku: '',
    referenceNumber: '',
    serialNumber: '',
    watchType: '',
    watchStyle: '',
    scopeOfDelivery: '',
    
    // Categorization
    category: '',
    condition: '',
    itemCondition: '',
    productionYear: '',
    gender: '',
    
    // Technical Specifications
    movement: '',
    dialColor: '',
    caseMaterial: '',
    strapMaterial: '',
    strapColor: '',
    strapSize: '',
    caseSize: '',
    crystal: '',
    dialNumerals: '',
    
    // Pricing
    regularPrice: '',
    salePrice: '',
    taxStatus: 'none',
    
    // Inventory
    stockQuantity: 1,
    
    // Listing Details
    visibility: 'visible',
    badges: [],
    
    // Sales Type
    listingType: 'auction',
    
    // Auction Fields
    startingPrice: '',
    bidIncrement: '',
    duration: '7',
    reservePrice: '',
    
    // Direct Sale Fields
    fixedPrice: '',
    minimumOffer: '',
    
    // Shipping
    shippingOption: 'uae-only',
    
    // Condition Assessment
    conditionStatus: 'used', // 'new' or 'used'
    componentCondition: {
      case: 'none',
      dial: 'none',
      bezel: 'none',
      crystal: 'none',
      caseBack: 'none',
      bandAndClasp: 'none'
    },
    replacementParts: {
      hasReplacements: 'no',
      replacedComponents: []
    },
    workingCondition: {
      isDefective: 'no',
      defectiveFunctions: []
    },
    testing: {
      waterResistanceTested: false,
      accuracyTested: false
    },
    servicing: {
      hasBeenServiced: false,
      serviceType: '',
      serviceDate: '',
      serviceDetails: ''
    },
    
    status: 'draft'
  });

  const [activeConditionTab, setActiveConditionTab] = useState('condition');
  const [images, setImages] = useState([]);
  const [newBadge, setNewBadge] = useState('');

  // Condition Options
  const conditionOptions = [
    { value: 'none', label: 'None', description: 'No visible wear or scratches' },
    { value: 'barely-visible', label: 'Barely Visible', description: 'Very minor signs of wear' },
    { value: 'noticeable', label: 'Noticeable', description: 'Noticeable scratches from regular use' },
    { value: 'obvious', label: 'Obvious', description: 'Clearly visible wear and scratches' }
  ];

  const replacementComponents = [
    'Dial', 'Crown', 'Clasp', 'Leather strap', 'Bezel', 'Hands', 
    'Pusher', 'Crystal', 'Coating', 'Diamond finishing', 
    'Metal bracelet', 'Case back', 'Movement replacement parts'
  ];

  const defectiveFunctions = [
    'Chronograph', 'Date function', 'Time setting', 'Power reserve',
    'Moon phase', 'GMT function', 'Alarm', 'Calendar'
  ];

  const serviceTypes = [
    'Full service', 'Movement service', 'Battery replacement',
    'Water resistance test', 'Regulation', 'Cleaning',
    'Served in-house', 'Served by the manufacturer'
  ];

  const categories = [
    'Watches',
    'Handbags & Bags',
    'Jewelry & Accessories',
    'Electronics',
    'Art & Collectibles',
    'Fashion & Clothing',
    'Sports Memorabilia',
    'Coins & Stamps',
    'Antiques',
    'Luxury Goods'
  ];

  const watchTypes = [
    'Automatic',
    'Quartz',
    'Manual Wind',
    'Solar',
    'Kinetic',
    'Smartwatch'
  ];

  const watchStyles = [
    'Dress',
    'Sports',
    'Diver',
    'Chronograph',
    'Pilot',
    'Field',
    'Racing',
    'Luxury',
    'Vintage'
  ];

  const conditions = [
    { value: 'new', label: 'Brand New' },
    { value: 'excellent', label: 'Excellent - Like New' },
    { value: 'very-good', label: 'Very Good' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const genders = [
    { value: 'mens', label: "Men's" },
    { value: 'womens', label: "Women's" },
    { value: 'unisex', label: 'Unisex' }
  ];

  const caseMaterials = [
    'Stainless Steel',
    'Gold',
    'Rose Gold',
    'White Gold',
    'Platinum',
    'Titanium',
    'Ceramic',
    'Bronze',
    'Carbon Fiber'
  ];

  const strapMaterials = [
    'Metal',
    'Leather',
    'Rubber',
    'Fabric',
    'Ceramic',
    'Silicone',
    'Alligator',
    'Crocodile',
    'Ostrich'
  ];

  const crystals = [
    'Sapphire',
    'Mineral',
    'Acrylic',
    'Hardlex',
    'Sapphire with AR Coating'
  ];

  const dialNumerals = [
    'Arabic',
    'Roman',
    'Stick',
    'No Numerals',
    'Mixed',
    'Diamond'
  ];

  const shippingOptions = [
    { value: 'uae-only', label: 'UAE Only', description: 'Shipping within UAE only' },
    { value: 'uae-gcc', label: 'UAE + GCC', description: 'Shipping to UAE and GCC countries' },
    { value: 'worldwide', label: 'Worldwide (DHL)', description: 'International shipping via DHL' }
  ];

  const durations = [
    { value: '1', label: '1 Day' },
    { value: '3', label: '3 Days' },
    { value: '5', label: '5 Days' },
    { value: '7', label: '7 Days' },
    { value: '10', label: '10 Days' },
    { value: '14', label: '14 Days' }
  ];

  const taxStatusOptions = [
    { value: 'none', label: 'None' },
    { value: 'taxable', label: 'Taxable' },
    { value: 'shipping', label: 'Shipping only' }
  ];

  const visibilityOptions = [
    { value: 'visible', label: 'Visible' },
    { value: 'hidden', label: 'Hidden' },
    { value: 'private', label: 'Private' }
  ];

  const conditionTabs = [
    { id: 'condition', label: 'Condition', icon: FiCheck },
    { id: 'replacements', label: 'Replacements', icon: FiSettings },
    { id: 'working', label: 'Working Condition', icon: FiAlertCircle },
    { id: 'testing', label: 'Testing', icon: FiDroplet },
    { id: 'servicing', label: 'Servicing', icon: FiSettings }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setProductData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleComponentConditionChange = (component, value) => {
    setProductData(prev => ({
      ...prev,
      componentCondition: {
        ...prev.componentCondition,
        [component]: value
      }
    }));
  };

  const handleReplacementPartToggle = (component) => {
    setProductData(prev => {
      const currentComponents = [...prev.replacementParts.replacedComponents];
      const index = currentComponents.indexOf(component);
      
      if (index > -1) {
        currentComponents.splice(index, 1);
      } else {
        currentComponents.push(component);
      }
      
      return {
        ...prev,
        replacementParts: {
          ...prev.replacementParts,
          replacedComponents: currentComponents
        }
      };
    });
  };

  const handleDefectiveFunctionToggle = (functionName) => {
    setProductData(prev => {
      const currentFunctions = [...prev.workingCondition.defectiveFunctions];
      const index = currentFunctions.indexOf(functionName);
      
      if (index > -1) {
        currentFunctions.splice(index, 1);
      } else {
        currentFunctions.push(functionName);
      }
      
      return {
        ...prev,
        workingCondition: {
          ...prev.workingCondition,
          defectiveFunctions: currentFunctions
        }
      };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 15));
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const setMainImage = (id) => {
    setImages(prev => {
      const mainImage = prev.find(img => img.id === id);
      const otherImages = prev.filter(img => img.id !== id);
      return [mainImage, ...otherImages];
    });
  };

  const addBadge = () => {
    if (newBadge.trim() && !productData.badges.includes(newBadge.trim())) {
      setProductData(prev => ({
        ...prev,
        badges: [...prev.badges, newBadge.trim()]
      }));
      setNewBadge('');
    }
  };

  const removeBadge = (badgeToRemove) => {
    setProductData(prev => ({
      ...prev,
      badges: prev.badges.filter(badge => badge !== badgeToRemove)
    }));
  };

  const handleBadgeKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBadge();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append product data
    Object.keys(productData).forEach(key => {
      if (Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });
    
    // Append images
    images.forEach(image => {
      formData.append('images', image.file);
    });
    
    console.log('Submitting product:', productData);
    // Send to backend
  };

  // Condition Assessment Component
  const ConditionAssessment = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <FiCheck className="mr-2 text-blue-600" />
        Condition Assessment
      </h2>

      {/* Condition Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-2 space-x-1 sm:space-x-2">
          {conditionTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveConditionTab(tab.id)}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeConditionTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Condition Status */}
      {activeConditionTab === 'condition' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Condition Status *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                productData.conditionStatus === 'new'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="conditionStatus"
                  value="new"
                  checked={productData.conditionStatus === 'new'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-900">New</span>
                </div>
                <p className="text-sm text-gray-600">Like new & unworn</p>
              </label>

              <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                productData.conditionStatus === 'used'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="conditionStatus"
                  value="used"
                  checked={productData.conditionStatus === 'used'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-900">Used</span>
                </div>
                <p className="text-sm text-gray-600">Previously worn</p>
              </label>
            </div>
          </div>

          {/* Component Condition Assessment */}
          {productData.conditionStatus === 'used' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Component Condition Assessment
              </h3>
              <div className="space-y-4">
                {Object.entries(productData.componentCondition).map(([component, value]) => (
                  <div key={component} className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3 capitalize">
                      {component.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {conditionOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
                            value === option.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`condition-${component}`}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => handleComponentConditionChange(component, option.value)}
                            className="hidden"
                          />
                          <span className="font-medium text-gray-900 text-sm">{option.label}</span>
                          <span className="text-xs text-gray-600 mt-1">{option.description}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Replacement Parts */}
      {activeConditionTab === 'replacements' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Have any components been replaced or customized?
            </label>
            <div className="flex space-x-4 mb-6">
              {['yes', 'no', 'unknown'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="hasReplacements"
                    value={option}
                    checked={productData.replacementParts.hasReplacements === option}
                    onChange={(e) => handleNestedInputChange('replacementParts', 'hasReplacements', e.target.value)}
                    className="mr-2"
                  />
                  <span className="capitalize text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            {productData.replacementParts.hasReplacements === 'yes' && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Select replaced or customized components:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {replacementComponents.map((component) => (
                    <label key={component} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={productData.replacementParts.replacedComponents.includes(component)}
                        onChange={() => handleReplacementPartToggle(component)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{component}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Working Condition */}
      {activeConditionTab === 'working' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Are any of the watch's functions defective or not as new?
            </label>
            <div className="flex space-x-4 mb-6">
              {['yes', 'no', 'unknown'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="isDefective"
                    value={option}
                    checked={productData.workingCondition.isDefective === option}
                    onChange={(e) => handleNestedInputChange('workingCondition', 'isDefective', e.target.value)}
                    className="mr-2"
                  />
                  <span className="capitalize text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            {productData.workingCondition.isDefective === 'yes' && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Select defective functions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {defectiveFunctions.map((func) => (
                    <label key={func} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={productData.workingCondition.defectiveFunctions.includes(func)}
                        onChange={() => handleDefectiveFunctionToggle(func)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{func}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Testing */}
      {activeConditionTab === 'testing' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Depth Rating and Accuracy Testing
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <span className="block text-sm font-medium text-gray-700">Water Resistance Tested</span>
                  <span className="text-sm text-gray-600">Has the watch been tested for water resistance?</span>
                </div>
                <input
                  type="checkbox"
                  checked={productData.testing.waterResistanceTested}
                  onChange={(e) => handleNestedInputChange('testing', 'waterResistanceTested', e.target.checked)}
                  className="rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <span className="block text-sm font-medium text-gray-700">Accuracy Tested</span>
                  <span className="text-sm text-gray-600">Has the watch been tested for timekeeping accuracy?</span>
                </div>
                <input
                  type="checkbox"
                  checked={productData.testing.accuracyTested}
                  onChange={(e) => handleNestedInputChange('testing', 'accuracyTested', e.target.checked)}
                  className="rounded"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Servicing */}
      {activeConditionTab === 'servicing' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Has the watch been serviced?
            </label>
            <div className="flex space-x-4 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasBeenServiced"
                  value={true}
                  checked={productData.servicing.hasBeenServiced === true}
                  onChange={() => handleNestedInputChange('servicing', 'hasBeenServiced', true)}
                  className="mr-2"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasBeenServiced"
                  value={false}
                  checked={productData.servicing.hasBeenServiced === false}
                  onChange={() => handleNestedInputChange('servicing', 'hasBeenServiced', false)}
                  className="mr-2"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>

            {productData.servicing.hasBeenServiced && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Servicing
                  </label>
                  <select
                    value={productData.servicing.serviceType}
                    onChange={(e) => handleNestedInputChange('servicing', 'serviceType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select service type</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={productData.servicing.serviceDate}
                    onChange={(e) => handleNestedInputChange('servicing', 'serviceDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Details
                  </label>
                  <textarea
                    value={productData.servicing.serviceDetails}
                    onChange={(e) => handleNestedInputChange('servicing', 'serviceDetails', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Provide detailed information about the servicing..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Listing</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">List your luxury item for auction or direct sale</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiFileText className="mr-2 text-blue-600" />
                Basic Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Rolex Submariner Date 126610LN"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={productData.shortDescription}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Brief description for product listings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Detailed product description including features, history, specifications, and condition..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Product Specifications Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiWatch className="mr-2 text-blue-600" />
                Product Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Rolex, Omega, Patek Philippe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={productData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Submariner, Speedmaster, Nautilus"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={productData.referenceNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 126610LN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={productData.serialNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 8A123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={productData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., SKU-ROLEX-126610LN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Production Year
                  </label>
                  <input
                    type="number"
                    name="productionYear"
                    value={productData.productionYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 2023"
                    min="1900"
                    max="2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Watch Type
                  </label>
                  <select
                    name="watchType"
                    value={productData.watchType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Type</option>
                    {watchTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Watch Style
                  </label>
                  <select
                    name="watchStyle"
                    value={productData.watchStyle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Style</option>
                    {watchStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiAward className="mr-2 text-blue-600" />
                Technical Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Movement
                  </label>
                  <input
                    type="text"
                    name="movement"
                    value={productData.movement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Automatic Caliber 3235"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Case Material
                  </label>
                  <select
                    name="caseMaterial"
                    value={productData.caseMaterial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Material</option>
                    {caseMaterials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Case Size (mm)
                  </label>
                  <input
                    type="number"
                    name="caseSize"
                    value={productData.caseSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 41"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Strap Material
                  </label>
                  <select
                    name="strapMaterial"
                    value={productData.strapMaterial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Material</option>
                    {strapMaterials.map(material => (
                      <option key={material} value={material}>{material}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Strap Color
                  </label>
                  <input
                    type="text"
                    name="strapColor"
                    value={productData.strapColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Black, Brown, Silver"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Strap Size (mm)
                  </label>
                  <input
                    type="number"
                    name="strapSize"
                    value={productData.strapSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 20"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Crystal
                  </label>
                  <select
                    name="crystal"
                    value={productData.crystal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Crystal</option>
                    {crystals.map(crystal => (
                      <option key={crystal} value={crystal}>{crystal}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Dial Color
                  </label>
                  <input
                    type="text"
                    name="dialColor"
                    value={productData.dialColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., Black, Blue, Green, Silver"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Dial Numerals
                  </label>
                  <select
                    name="dialNumerals"
                    value={productData.dialNumerals}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Numerals</option>
                    {dialNumerals.map(numeral => (
                      <option key={numeral} value={numeral}>{numeral}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={productData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Gender</option>
                    {genders.map(gender => (
                      <option key={gender.value} value={gender.value}>{gender.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Condition Assessment Component */}
            <ConditionAssessment />

            {/* Condition & Categorization Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Condition & Categorization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Overall Condition *
                  </label>
                  <select
                    name="condition"
                    value={productData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition.value} value={condition.value}>{condition.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Item Condition Description
                  </label>
                  <textarea
                    name="itemCondition"
                    value={productData.itemCondition}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Describe the condition in detail including any scratches, wear, or imperfections..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Scope of Delivery
                  </label>
                  <textarea
                    name="scopeOfDelivery"
                    value={productData.scopeOfDelivery}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="List all items included (box, papers, warranty card, extra links, etc.)"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Sales Type Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiDollarSign className="mr-2 text-blue-600" />
                Pricing & Sales Type
              </h2>
              
              <div className="space-y-6">
                {/* Sales Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Listing Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      productData.listingType === 'auction'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="listingType"
                        value="auction"
                        checked={productData.listingType === 'auction'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="flex items-center mb-2">
                        <FiClock className="text-blue-600 mr-2" size={20} />
                        <span className="font-semibold text-gray-900">Auction</span>
                      </div>
                      <p className="text-sm text-gray-600">Sell to the highest bidder</p>
                    </label>

                    <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      productData.listingType === 'direct'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="listingType"
                        value="direct"
                        checked={productData.listingType === 'direct'}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="flex items-center mb-2">
                        <FiDollarSign className="text-green-600 mr-2" size={20} />
                        <span className="font-semibold text-gray-900">Direct Sale</span>
                      </div>
                      <p className="text-sm text-gray-600">Fixed price with offers</p>
                    </label>
                  </div>
                </div>

                {/* Auction Fields */}
                {productData.listingType === 'auction' && (
                  <div className="space-y-4 bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FiClock className="mr-2 text-blue-600" />
                      Auction Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Starting Price (AED) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">AED</span>
                          </div>
                          <input
                            type="number"
                            name="startingPrice"
                            value={productData.startingPrice}
                            onChange={handleInputChange}
                            className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bid Increment (AED) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">AED</span>
                          </div>
                          <input
                            type="number"
                            name="bidIncrement"
                            value={productData.bidIncrement}
                            onChange={handleInputChange}
                            className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auction Duration *
                        </label>
                        <select
                          name="duration"
                          value={productData.duration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          required
                        >
                          {durations.map(duration => (
                            <option key={duration.value} value={duration.value}>
                              {duration.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reserve Price (AED)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">AED</span>
                          </div>
                          <input
                            type="number"
                            name="reservePrice"
                            value={productData.reservePrice}
                            onChange={handleInputChange}
                            className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Minimum price to sell (hidden from bidders)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct Sale Fields */}
                {productData.listingType === 'direct' && (
                  <div className="space-y-4 bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <FiDollarSign className="mr-2 text-green-600" />
                      Direct Sale Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Regular Price (AED)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">AED</span>
                          </div>
                          <input
                            type="number"
                            name="regularPrice"
                            value={productData.regularPrice}
                            onChange={handleInputChange}
                            className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sale Price (AED) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">AED</span>
                          </div>
                          <input
                            type="number"
                            name="salePrice"
                            value={productData.salePrice}
                            onChange={handleInputChange}
                            className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Acceptable Offer (AED)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">AED</span>
                        </div>
                        <input
                          type="number"
                          name="minimumOffer"
                          value={productData.minimumOffer}
                          onChange={handleInputChange}
                          className="pl-16 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Inventory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stockQuantity"
                      value={productData.stockQuantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="1"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Status
                    </label>
                    <select
                      name="taxStatus"
                      value={productData.taxStatus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {taxStatusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Additional Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiTruck className="mr-2 text-blue-600" />
                Shipping & Additional Details
              </h2>
              
              <div className="space-y-6">
                {/* Shipping Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Shipping Options *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          productData.shippingOption === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingOption"
                          value={option.value}
                          checked={productData.shippingOption === option.value}
                          onChange={handleInputChange}
                          className="hidden"
                          required
                        />
                        <span className="font-medium text-gray-900">{option.label}</span>
                        <span className="text-sm text-gray-600 mt-1">{option.description}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Badges
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      onKeyPress={handleBadgeKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Add badges (e.g., Certified, Vintage, Limited Edition)"
                    />
                    <button
                      type="button"
                      onClick={addBadge}
                      className="px-4 py-3 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                      >
                        {badge}
                        <button
                          type="button"
                          onClick={() => removeBadge(badge)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    value={productData.visibility}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    {visibilityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Media Upload Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiImage className="mr-2 text-blue-600" />
                Product Images
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Upload Images (5-15 photos) *
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                    {/* Image Upload Box */}
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                      <FiUpload className="text-gray-400 mb-2" size={24} />
                      <span className="text-sm text-gray-500 text-center px-2">Upload Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Image Previews */}
                    {images.map((image, index) => (
                      <div key={image.id} className="relative group aspect-square">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-xl flex items-center justify-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setMainImage(image.id)}
                            className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 p-2 rounded-lg transition-opacity"
                            title="Set as main"
                          >
                            <FiImage size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-lg transition-opacity"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{images.length}/15 photos uploaded</span>
                    <span>First image is main photo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base"
                >
                  Save as Draft
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold shadow-sm text-sm sm:text-base"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;