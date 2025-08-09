'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Car, Wrench, Clipboard, MapPin, Receipt, Camera, FileText, Star, Filter, X, Upload, Calendar, AlertTriangle, Clock, CheckCircle, Bell, Settings, ArrowLeft, ChevronRight, Zap, History, Package, Image, User, Phone, Mail, ArrowRight, Check } from 'lucide-react';

  
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