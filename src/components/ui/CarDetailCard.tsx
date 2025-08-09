'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Camera, Settings, Plus, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCarsStore } from '@/lib/store'

interface CarDetailViewProps {
  carId: string
  onBack: () => void
}

export default function CarDetailView({ carId, onBack }: CarDetailViewProps) {
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { updateCar, deleteCar } = useCarsStore()

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`)
        const carData = await response.json()
        setCar(carData)
      } catch (error) {
        console.error('Failed to fetch car details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [carId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Car not found</h2>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Settings },
    { id: 'maintenance', name: 'Maintenance', icon: Settings },
    { id: 'projects', name: 'Projects', icon: Settings },
    { id: 'parts', name: 'Parts', icon: Settings },
    { id: 'photos', name: 'Photos', icon: Camera },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-colors flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span>Back to Garage</span>
          </button>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">
              {car.nickname || car.name}
            </h1>
            <p className="text-gray-400">
              {car.year} {car.make} {car.model}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Edit size={16} />
              <span>Edit</span>
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Car Image */}
            <div className="md:col-span-1">
              {car.photos?.[0] ? (
                <div className="aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={car.photos[0].url}
                    alt={car.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-700 rounded-xl flex items-center justify-center">
                  <Camera size={64} className="text-gray-500" />
                </div>
              )}
            </div>
            
            {/* Car Info */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Vehicle Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">VIN:</span>
                      <span className="text-white font-mono text-sm">{car.vin || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Color:</span>
                      <span className="text-white">{car.color || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mileage:</span>
                      <span className="text-white">{car.mileage?.toLocaleString()} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{car.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Engine:</span>
                      <span className="text-white">{car.engine || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Horsepower:</span>
                      <span className="text-white">{car.horsepower || 'Unknown'} HP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transmission:</span>
                      <span className="text-white">{car.transmission || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Drivetrain:</span>
                      <span className="text-white">{car.drivetrain || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-xl p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              {car.notes ? (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Notes</h3>
                  <p className="text-gray-300">{car.notes}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No notes added yet</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Add Notes
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'maintenance' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Maintenance</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add Maintenance</span>
                </button>
              </div>
              
              {car.maintenanceItems?.length > 0 ? (
                <div className="space-y-4">
                  {car.maintenanceItems.map((item) => (
                    <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold">{item.type}</h3>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                          <p className="text-gray-300 text-sm mt-1">
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.status === 'OVERDUE' ? 'bg-red-600 text-white' :
                          item.status === 'DUE_SOON' ? 'bg-yellow-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No maintenance items yet</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Add First Maintenance Item
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Add other tab content as needed */}
        </div>
      </div>
    </div>
  )
}

// // details an individual car's components and specifications using tailwindcss for styling and next.js as a framework and inheriting the carCard.tsx component for the car's basic information.
// import React from 'react';
// import { Car } from '../GarageManager';

// interface CarDetailsProps {
//   car: Car;
// }

// const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
//   return (
//     <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
//       <div className="flex items-center mb-6">
//         <div className="flex-1">
//           <h3 className="text-white font-bold text-xl mb-2">{car.nickname || car.name}</h3>
//           <p className="text-gray-400">{car.year} {car.make} {car.model}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-white font-semibold">{car.mileage?.toLocaleString()} miles</p>
//           <p className="text-gray-400 text-sm">{car.status}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-gray-700 p-4 rounded-lg">
//           <h4 className="text-white font-semibold mb-2">Engine</h4>
//           <p className="text-gray-400">{car.specs?.engine}</p>
//         </div>
//         <div className="bg-gray-700 p-4 rounded-lg">
//           <h4 className="text-white font-semibold mb-2">Horsepower</h4>
//           <p className="text-gray-400">{car.specs?.horsepower}</p>
//         </div>
//         <div className="bg-gray-700 p-4 rounded-lg">
//           <h4 className="text-white font-semibold mb-2">Transmission</h4>
//           <p className="text-gray-400">{car.specs?.transmission}</p>
//         </div>
//         <div className="bg-gray-700 p-4 rounded-lg">
//           <h4 className="text-white font-semibold mb-2">Drivetrain</h4>
//           <p className="text-gray-400">{car.specs?.drivetrain}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;



