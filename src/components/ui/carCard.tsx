'use client'

import { useState } from 'react'
import { Car, Camera, Settings, AlertTriangle, Clock } from 'lucide-react'
import Image from 'next/image'
import { useCarsStore } from '@/lib/store'

interface CarCardProps {
  car: Car
  onClick?: () => void
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const [imageError, setImageError] = useState(false)
  const heroPhoto = car.photos?.[0]

  const getStatusColor = () => {
    switch (car.status) {
      case 'RUNNING': return 'from-green-600 to-green-800'
      case 'IN_PROGRESS': return 'from-yellow-600 to-yellow-800'
      case 'NEEDS_REPAIR': return 'from-red-600 to-red-800'
      case 'STORED': return 'from-blue-600 to-blue-800'
      default: return 'from-gray-600 to-gray-800'
    }
  }

  const getStatusIcon = () => {
    switch (car.status) {
      case 'RUNNING': return '✅'
      case 'IN_PROGRESS': return '🔧'
      case 'NEEDS_REPAIR': return '⚠️'
      case 'STORED': return '🏠'
      default: return '❓'
    }
  }

  return (
    <div 
      className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Background Photo */}
      {heroPhoto && !imageError && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src={heroPhoto.url}
            alt={car.name}
            fill
            className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300 filter grayscale"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
              {car.nickname || car.name}
            </h2>
            <p className="text-gray-300 text-sm drop-shadow">
              {car.year} {car.make} {car.model}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {car.color} • {car.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor()} text-white text-sm font-semibold backdrop-blur-sm flex items-center space-x-1`}>
              <span>{getStatusIcon()}</span>
              <span>{car.status.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Car Image/Placeholder */}
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl h-32 mb-6 flex items-center justify-center group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300 backdrop-blur-sm overflow-hidden">
          {heroPhoto && !imageError ? (
            <div className="relative w-full h-full">
              <Image 
                src={heroPhoto.url} 
                alt={car.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ) : (
            <Car size={48} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center bg-gray-700/40 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white drop-shadow">
              {car.mileage?.toLocaleString()}
            </p>
            <p className="text-gray-300 text-sm">Miles</p>
          </div>
          <div className="text-center bg-gray-700/40 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white drop-shadow">
              {car.horsepower || '---'}
            </p>
            <p className="text-gray-300 text-sm">Horsepower</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600/80 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors backdrop-blur-sm flex items-center justify-center space-x-1">
            <Settings size={16} />
            <span>Manage</span>
          </button>
          <button className="p-2 bg-gray-700/80 hover:bg-gray-600 text-white rounded-lg transition-colors backdrop-blur-sm">
            <Camera size={16} />
          </button>
        </div>

        {/* Quick Status Indicators */}
        <div className="flex items-center justify-between text-gray-300 group-hover:text-blue-300 transition-colors mt-4">
          <span className="text-sm drop-shadow">
            {car.photos?.length || 0} photos
          </span>
          <span className="text-sm drop-shadow">
            Last updated {new Date(car.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

// import Image from 'next/image'

// // Card component for displaying car information
// interface CarCardProps {
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   imageUrl: string;
//   description?: string;
// }

// const CarCard = ({ make, model, year, price, imageUrl, description }: CarCardProps) => {
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
//       <Image
//         className="w-full h-48 object-cover"
//         src={imageUrl}
//         alt={`${make} ${model}`}
//         width={400}
//         height={192}
//         style={{ objectFit: 'cover' }}
//         priority
//       />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{`${year} ${make} ${model}`}</div>
//         <p className="text-gray-700 text-base mb-2">
//           ${price.toLocaleString()}
//         </p>
//         {description && (
//           <p className="text-gray-600 text-sm">
//             {description}
//           </p>
//         )}
//       </div>
//       <div className="px-6 pt-4 pb-2">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//           {make}
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//           {model}
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//           {year}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CarCard;