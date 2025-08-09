'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Car, Wrench, Clipboard, MapPin, Receipt, Camera, FileText, Star, Filter, X, Upload, Calendar, AlertTriangle, Clock, CheckCircle, Bell, Settings, ArrowLeft, ChevronRight, Zap, History, Package, Image, User, Phone, Mail, ArrowRight, Check } from 'lucide-react';

import Auth from './auth/auth';
import Onboarding from './onboarding/onboarding';

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

  // Filter data by current user
  const userCars = cars.filter(car => car.userId === currentUser?.id);
  const userTools = tools.filter(tool => tool.userId === currentUser?.id);

  // Show auth screen if no user is logged in
  if (!currentUser && !isOnboarding) {
    return <Auth.AuthScreen />;
  }

  // Show onboarding if in onboarding flow
  if (isOnboarding) {
    return <Onboarding.OnboardingFlow />;
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