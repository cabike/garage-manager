import Image from 'next/image'

// Card component for displaying car information
interface CarCardProps {
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  description?: string;
}

const CarCard = ({ make, model, year, price, imageUrl, description }: CarCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={`${make} ${model}`}
        width={400}
        height={192}
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${year} ${make} ${model}`}</div>
        <p className="text-gray-700 text-base mb-2">
          ${price.toLocaleString()}
        </p>
        {description && (
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {make}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {model}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {year}
        </span>
      </div>
    </div>
  );
};

export default CarCard;