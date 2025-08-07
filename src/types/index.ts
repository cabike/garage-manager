export interface User {
  id: number;
  name: string;
  email: string;
  location: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  interests: string[];
  joinDate: string;
  avatar?: string;
  garageSize?: string;
  preferredBrands?: string[];
}

export interface Car {
  id: number;
  userId: number;
  name: string;
  nickname?: string;
  vin?: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  location: string;
  status: 'Running' | 'In Progress' | 'Needs Repair' | 'Stored';
  lastService?: string;
  mileage: number;
  photos: string[];
  notes?: string;
  specs?: {
    engine?: string;
    horsepower?: number;
    transmission?: string;
    drivetrain?: string;
  };
}

export interface Tool {
  id: number;
  userId: number;
  name: string;
  category: string;
  location: string;
  condition: string;
  purchaseDate?: string;
  value: number;
  photos: string[];
  notes?: string;
}

// Add other interfaces as needed...