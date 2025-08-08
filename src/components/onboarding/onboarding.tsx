  'use client'
  
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { useUser } from '../contexts/user-context';
import { useGarage } from '../contexts/garage-context';
import { useTools } from '../contexts/tools-context';
import { useOnboarding } from '../contexts/onboarding-context';
import { useModal } from '../contexts/modal-context';
import { useAlert } from '../contexts/alert-context';
import { useLoading } from '../contexts/loading-context';
import { useTheme } from '../contexts/theme-context';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Garage } from '../types/garage-types';
import { Tool } from '../types/tool-types';
import { OnboardingData } from '../types/onboarding-types';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const { garage, updateGarage } = useGarage();
  const { tools, updateTools } = useTools();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { openModal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [onboardingStep, setOnboardingStep] = useState(1);
  
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