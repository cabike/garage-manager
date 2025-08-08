// details an individual car's components and specifications using tailwindcss for styling and next.js as a framework and inheriting the carCard.tsx component for the car's basic information.
import React from 'react';
import { Car } from '../GarageManager';

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <h3 className="text-white font-bold text-xl mb-2">{car.nickname || car.name}</h3>
          <p className="text-gray-400">{car.year} {car.make} {car.model}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">{car.mileage?.toLocaleString()} miles</p>
          <p className="text-gray-400 text-sm">{car.status}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Engine</h4>
          <p className="text-gray-400">{car.specs?.engine}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Horsepower</h4>
          <p className="text-gray-400">{car.specs?.horsepower}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Transmission</h4>
          <p className="text-gray-400">{car.specs?.transmission}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Drivetrain</h4>
          <p className="text-gray-400">{car.specs?.drivetrain}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;



