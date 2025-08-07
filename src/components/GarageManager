'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Car, Wrench, Clipboard, MapPin, Receipt, Camera, FileText, Star, Filter, X, Upload, Calendar, AlertTriangle, Clock, CheckCircle, Bell, Settings, ArrowLeft, ChevronRight, Zap, History, Package, Image, User, Phone, Mail, ArrowRight, Check } from 'lucide-react';

const GarageManager = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({});
  
  const [activeView, setActiveView] = useState('garage');
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeCarSection, setActiveCarSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('car');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoModalTarget, setPhotoModalTarget] = useState(null);

  // User system
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      location: 'Austin, TX',
      experience: 'intermediate',
      interests: ['performance', 'restoration'],
      joinDate: '2024-01-15',
      avatar: null,
      garageSize: 'large',
      preferredBrands: ['Ford', 'Chevrolet']
    }
  ]);

  // Recommended tools database
  const [recommendedTools] = useState({
    essential: [
      { name: 'Socket Set (Metric & Standard)', category: 'Hand Tools', cost: 89, difficulty: 'essential', description: 'Complete socket set for most automotive work' },
      { name: 'Torque Wrench', category: 'Precision Tools', cost: 75, difficulty: 'essential', description: 'Critical for proper fastener tension' },
      { name: 'OBD-II Scanner', category: 'Diagnostic', cost: 45, difficulty: 'essential', description: 'Read engine codes and diagnostics' },
      { name: 'Floor Jack', category: 'Lifting', cost: 120, difficulty: 'essential', description: 'Safe vehicle lifting for maintenance' },
      { name: 'Jack Stands (Pair)', category: 'Safety', cost: 65, difficulty: 'essential', description: 'Never work under a car without these!' }
    ],
    performance: [
      { name: 'Compression Tester', category: 'Engine Tools', cost: 55, difficulty: 'intermediate', description: 'Test engine cylinder compression' },
      { name: 'Timing Light', category: 'Engine Tools', cost: 85, difficulty: 'intermediate', description: 'Set ignition timing precisely' },
      { name: 'Multimeter', category: 'Electrical', cost: 35, difficulty: 'intermediate', description: 'Electrical system diagnostics' },
      { name: 'Valve Spring Compressor', category: 'Engine Tools', cost: 95, difficulty: 'advanced', description: 'Cylinder head work and valve jobs' }
    ],
    restoration: [
      { name: 'Body Filler Kit', category: 'Body Work', cost: 25, difficulty: 'intermediate', description: 'Repair rust and dents' },
      { name: 'Paint Gun & Compressor', category: 'Paint', cost: 250, difficulty: 'advanced', description: 'Professional paint application' },
      { name: 'Metal Cutting Tools', category: 'Fabrication', cost: 150, difficulty: 'advanced', description: 'Cut and shape metal panels' },
      { name: 'Welding Equipment', category: 'Fabrication', cost: 300, difficulty: 'expert', description: 'Join metal parts permanently' }
    ]
  });

  // Sample data - now user-specific
  const [cars, setCars] = useState([
    {
      id: 1,
      userId: 1,
      name: '2018 Ford Mustang GT',
      nickname: 'Thunder',
      vin: '1FA6P8CF5J5123456',
      make: 'Ford',
      model: 'Mustang GT',
      year: 2018,
      color: 'Race Red',
      location: 'Bay 1',
      status: 'Running',
      lastService: '2024-06-15',
      mileage: 45000,
      photos: [
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23dc2626;stop-opacity:1" /><stop offset="100%" style="stop-color:%23991b1b;stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23g1)"/><rect x="50" y="180" width="300" height="80" rx="15" fill="%23000" opacity="0.3"/><circle cx="100" cy="250" r="25" fill="%23374151"/><circle cx="300" cy="250" r="25" fill="%23374151"/><rect x="80" y="100" width="240" height="80" rx="10" fill="%23000" opacity="0.2"/><text x="200" y="50" text-anchor="middle" fill="white" font-family="Arial" font-size="20" font-weight="bold">Mustang GT</text></svg>'
      ],
      notes: 'Daily driver, excellent condition',
      specs: {
        engine: '5.0L V8 Coyote',
        horsepower: 460,
        transmission: '6-Speed Manual',
        drivetrain: 'RWD'
      }
    }
  ]);

  const [tools, setTools] = useState([
    {
      id: 1,
      userId: 1,
      name: 'Snap-on Ratchet Set',
      category: 'Hand Tools',
      location: 'Toolbox A - Drawer 2',
      condition: 'Excellent',
      purchaseDate: '2023-03-15',
      value: 350,
      photos: []
    }
  ]);

  // Login/Signup Component
  const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [authData, setAuthData] = useState({});

    const handleAuth = () => {
      if (isLogin) {
        // Mock login
        const user = users.find(u => u.email === authData.email);
        if (user) {
          setCurrentUser(user);
        } else {
          alert('User not found');
        }
      } else {
        // Start onboarding for new user
        setOnboardingData(authData);
        setIsOnboarding(true);
        setOnboardingStep(1);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-700">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏎️</div>
            <h1 className="text-3xl font-bold text-white mb-2">Garage Manager</h1>
            <p className="text-gray-400">Your automotive command center</p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                onChange={(e) => setAuthData({...authData, name: e.target.value})}
              />
            )}
            
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setAuthData({...authData, email: e.target.value})}
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
            />

            <button
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {isLogin ? 'Enter Garage' : 'Start Your Journey'}
            </button>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Onboarding Flow
  const OnboardingFlow = () => {
    const [selectedTools, setSelectedTools] = useState([]);

    const ProgressBar = () => (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Step {onboardingStep} of 4</span>
          <span className="text-sm text-gray-400">{Math.round((onboardingStep / 4) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(onboardingStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    );

    const Step1_Profile = () => (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Tell us about yourself</h2>
          <p className="text-gray-400">Help us personalize your garage experience</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={onboardingData.firstName || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, firstName: e.target.value})}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={onboardingData.lastName || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, lastName: e.target.value})}
          />
        </div>

        <input
          type="text"
          placeholder="Location (City, State)"
          value={onboardingData.location || ''}
          className="w-full p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          onChange={(e) => setOnboardingData({...onboardingData, location: e.target.value})}
        />

        <div>
          <label className="block text-white font-semibold mb-3">Experience Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['beginner', 'intermediate', 'expert'].map(level => (
              <button
                key={level}
                onClick={() => setOnboardingData({...onboardingData, experience: level})}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  onboardingData.experience === level
                    ? 'border-blue-500 bg-blue-900/50 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {level === 'beginner' ? '🔧' : level === 'intermediate' ? '⚙️' : '🏆'}
                  </div>
                  <div className="font-semibold capitalize">{level}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">What interests you most?</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'performance', name: 'Performance Mods', icon: '🚀' },
              { id: 'restoration', name: 'Restoration', icon: '🔄' },
              { id: 'maintenance', name: 'Maintenance', icon: '🛠️' },
              { id: 'aesthetics', name: 'Aesthetics', icon: '✨' }
            ].map(interest => (
              <button
                key={interest.id}
                onClick={() => {
                  const interests = onboardingData.interests || [];
                  const newInterests = interests.includes(interest.id)
                    ? interests.filter(i => i !== interest.id)
                    : [...interests, interest.id];
                  setOnboardingData({...onboardingData, interests: newInterests});
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  (onboardingData.interests || []).includes(interest.id)
                    ? 'border-blue-500 bg-blue-900/50 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="font-semibold">{interest.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const Step2_FirstCar = () => (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Add your first car</h2>
          <p className="text-gray-400">Let's get your pride and joy in the system</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input
            type="number"
            placeholder="Year"
            value={onboardingData.carYear || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, carYear: e.target.value})}
          />
          <input
            type="text"
            placeholder="Make"
            value={onboardingData.carMake || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, carMake: e.target.value})}
          />
          <input
            type="text"
            placeholder="Model"
            value={onboardingData.carModel || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, carModel: e.target.value})}
          />
        </div>

        <input
          type="text"
          placeholder="Nickname (optional)"
          value={onboardingData.carNickname || ''}
          className="w-full p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          onChange={(e) => setOnboardingData({...onboardingData, carNickname: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Current Mileage"
            value={onboardingData.carMileage || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, carMileage: e.target.value})}
          />
          <input
            type="text"
            placeholder="Color"
            value={onboardingData.carColor || ''}
            className="p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setOnboardingData({...onboardingData, carColor: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">Current Condition</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'Running', name: 'Running Great', icon: '✅' },
              { id: 'Needs Work', name: 'Needs Some Work', icon: '🔧' },
              { id: 'Project Car', name: 'Project Car', icon: '🚧' },
              { id: 'Restoration', name: 'Full Restoration', icon: '🔄' }
            ].map(status => (
              <button
                key={status.id}
                onClick={() => setOnboardingData({...onboardingData, carStatus: status.id})}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  onboardingData.carStatus === status.id
                    ? 'border-blue-500 bg-blue-900/50 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{status.icon}</div>
                  <div className="font-semibold text-sm">{status.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );

    const Step3_Tools = () => {
      const getRecommendedTools = () => {
        const interests = onboardingData.interests || [];
        let tools = [...recommendedTools.essential];
        
        if (interests.includes('performance')) {
          tools = [...tools, ...recommendedTools.performance.slice(0, 3)];
        }
        if (interests.includes('restoration')) {
          tools = [...tools, ...recommendedTools.restoration.slice(0, 3)];
        }
        
        return tools;
      };

      const recommendedForUser = getRecommendedTools();
      const totalCost = selectedTools.reduce((sum, tool) => sum + tool.cost, 0);

      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Equip your garage</h2>
            <p className="text-gray-400">We've curated tools based on your interests</p>
          </div>

          {selectedTools.length > 0 && (
            <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{selectedTools.length} tools selected</span>
                <span className="text-green-400 font-bold">${totalCost.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recommendedForUser.map((tool, index) => {
              const isSelected = selectedTools.some(t => t.name === tool.name);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/50'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTools(prev => prev.filter(t => t.name !== tool.name));
                    } else {
                      setSelectedTools(prev => [...prev, tool]);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{tool.name}</h3>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-blue-400 text-sm">{tool.category}</span>
                        <span className="text-green-400 font-semibold">${tool.cost}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {isSelected ? (
                        <Check className="text-blue-400" size={24} />
                      ) : (
                        <Plus className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const Step4_Complete = () => (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to your garage!</h2>
        <p className="text-gray-400 mb-8">Everything is set up and ready to go</p>

        <div className="bg-gray-700 rounded-xl p-6 text-left">
          <h3 className="text-white font-bold mb-4">What we've set up for you:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Check className="text-green-400" size={16} />
              <span className="text-gray-300">Your profile and preferences</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-green-400" size={16} />
              <span className="text-gray-300">
                Your {onboardingData.carYear} {onboardingData.carMake} {onboardingData.carModel}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-green-400" size={16} />
              <span className="text-gray-300">{selectedTools.length} recommended tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="text-green-400" size={16} />
              <span className="text-gray-300">Personalized upgrade recommendations</span>
            </div>
          </div>
        </div>
      </div>
    );

    const completeOnboarding = () => {
      // Create new user
      const newUser = {
        id: Date.now(),
        name: `${onboardingData.firstName} ${onboardingData.lastName}`,
        email: onboardingData.email,
        location: onboardingData.location,
        experience: onboardingData.experience,
        interests: onboardingData.interests || [],
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null
      };
      
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);

      // Add their first car
      if (onboardingData.carMake) {
        const newCar = {
          id: Date.now(),
          userId: newUser.id,
          name: `${onboardingData.carYear} ${onboardingData.carMake} ${onboardingData.carModel}`,
          nickname: onboardingData.carNickname || '',
          make: onboardingData.carMake,
          model: onboardingData.carModel,
          year: parseInt(onboardingData.carYear),
          color: onboardingData.carColor,
          mileage: parseInt(onboardingData.carMileage) || 0,
          status: onboardingData.carStatus || 'Running',
          location: 'Garage',
          photos: [],
          notes: 'Added during onboarding'
        };
        setCars(prev => [...prev, newCar]);
      }

      // Add selected tools
      selectedTools.forEach(tool => {
        const newTool = {
          id: Date.now() + Math.random(),
          userId: newUser.id,
          name: tool.name,
          category: tool.category,
          location: 'Garage',
          condition: 'New',
          value: tool.cost,
          photos: [],
          notes: 'Added during onboarding'
        };
        setTools(prev => [...prev, newTool]);
      });

      setIsOnboarding(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl mx-4 border border-gray-700">
          <ProgressBar />
          
          <div className="min-h-[400px]">
            {onboardingStep === 1 && <Step1_Profile />}
            {onboardingStep === 2 && <Step2_FirstCar />}
            {onboardingStep === 3 && <Step3_Tools />}
            {onboardingStep === 4 && <Step4_Complete />}
          </div>

          <div className="flex items-center justify-between mt-8">
            {onboardingStep > 1 && onboardingStep < 4 && (
              <button
                onClick={() => setOnboardingStep(prev => prev - 1)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}

            <div className="flex-1"></div>

            {onboardingStep < 4 && (
              <button
                onClick={() => setOnboardingStep(prev => prev + 1)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
              >
                <span>Continue</span>
                <ArrowRight size={20} />
              </button>
            )}

            {onboardingStep === 4 && (
              <button
                onClick={completeOnboarding}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-bold text-lg"
              >
                Enter Your Garage 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Filter data by current user
  const userCars = cars.filter(car => car.userId === currentUser?.id);
  const userTools = tools.filter(tool => tool.userId === currentUser?.id);

  // Show auth screen if no user is logged in
  if (!currentUser && !isOnboarding) {
    return <AuthScreen />;
  }

  // Show onboarding if in onboarding flow
  if (isOnboarding) {
    return <OnboardingFlow />;
  }

  // Main app components remain the same but now filter by user...
  // [Previous components like CarCard, CarDetailView, etc. would go here with user filtering]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🏎️ {currentUser?.name}'s Garage</h1>
            <p className="text-gray-400">Welcome back! You have {userCars.length} cars and {userTools.length} tools</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white font-semibold">{currentUser?.name}</div>
              <div className="text-gray-400 text-sm">{currentUser?.location}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentUser?.name?.[0]}
            </div>
            <button
              onClick={() => setCurrentUser(null)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userCars.map(car => (
            <div key={car.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-white font-bold text-xl mb-2">{car.nickname || car.name}</h3>
              <p className="text-gray-400">{car.year} {car.make} {car.model}</p>
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <div className="text-white font-semibold">{car.mileage?.toLocaleString()} miles</div>
                <div className="text-gray-400 text-sm">{car.status}</div>
              </div>
            </div>
          ))}
          
          {/* Add Car Button */}
          <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl p-6 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
            <div className="text-center">
              <Plus className="text-gray-400 mx-auto mb-2" size={48} />
              <p className="text-gray-400">Add Another Car</p>
            </div>
          </div>
        </div>

        {userCars.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Ready to add your first car?</h3>
            <p className="text-gray-500 mb-6">Let's get your ride into the system</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold">
              Add Your First Car
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GarageManager;