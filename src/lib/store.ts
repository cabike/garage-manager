import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  location?: string
  experience: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
  interests: string[]
}

interface Car {
  id: string
  userId: string
  name: string
  nickname?: string
  make: string
  model: string
  year: number
  mileage: number
  status: 'RUNNING' | 'IN_PROGRESS' | 'NEEDS_REPAIR' | 'STORED'
  photos: Photo[]
  // ... other fields
}

interface Tool {
  id: string
  userId: string
  name: string
  category: string
  location: string
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  photos: Photo[]
  // ... other fields
}

interface Photo {
  id: string
  url: string
  caption?: string
}

// Auth Store
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (email: string, password: string) => {
          set({ isLoading: true })
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            })
            
            if (response.ok) {
              const user = await response.json()
              set({ user, isAuthenticated: true, isLoading: false })
            } else {
              throw new Error('Login failed')
            }
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false })
          // Call logout API
          fetch('/api/auth/logout', { method: 'POST' })
        },

        setUser: (user: User) => {
          set({ user, isAuthenticated: true })
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    )
  )
)

// Cars Store
interface CarsState {
  cars: Car[]
  selectedCar: Car | null
  isLoading: boolean
  fetchCars: () => Promise<void>
  addCar: (car: Omit<Car, 'id'>) => Promise<void>
  updateCar: (id: string, updates: Partial<Car>) => Promise<void>
  deleteCar: (id: string) => Promise<void>
  selectCar: (car: Car) => void
}

export const useCarsStore = create<CarsState>()(
  devtools((set, get) => ({
    cars: [],
    selectedCar: null,
    isLoading: false,

    fetchCars: async () => {
      set({ isLoading: true })
      try {
        const response = await fetch('/api/cars')
        const cars = await response.json()
        set({ cars, isLoading: false })
      } catch (error) {
        set({ isLoading: false })
        console.error('Failed to fetch cars:', error)
      }
    },

    addCar: async (carData) => {
      try {
        const response = await fetch('/api/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData),
        })
        const newCar = await response.json()
        set((state) => ({ cars: [...state.cars, newCar] }))
      } catch (error) {
        console.error('Failed to add car:', error)
        throw error
      }
    },

    updateCar: async (id, updates) => {
      try {
        const response = await fetch(`/api/cars/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        const updatedCar = await response.json()
        set((state) => ({
          cars: state.cars.map((car) => (car.id === id ? updatedCar : car)),
          selectedCar: state.selectedCar?.id === id ? updatedCar : state.selectedCar,
        }))
      } catch (error) {
        console.error('Failed to update car:', error)
        throw error
      }
    },

    deleteCar: async (id) => {
      try {
        await fetch(`/api/cars/${id}`, { method: 'DELETE' })
        set((state) => ({
          cars: state.cars.filter((car) => car.id !== id),
          selectedCar: state.selectedCar?.id === id ? null : state.selectedCar,
        }))
      } catch (error) {
        console.error('Failed to delete car:', error)
        throw error
      }
    },

    selectCar: (car) => set({ selectedCar: car }),
  }))
)

// Tools Store
interface ToolsState {
  tools: Tool[]
  selectedTool: Tool | null
  isLoading: boolean
  fetchTools: () => Promise<void>
  addTool: (tool: Omit<Tool, 'id'>) => Promise<void>
  updateTool: (id: string, updates: Partial<Tool>) => Promise<void>
  deleteTool: (id: string) => Promise<void>
  selectTool: (tool: Tool) => void
}

export const useToolsStore = create<ToolsState>()(
  devtools((set, get) => ({
    tools: [],
    selectedTool: null,
    isLoading: false,

    fetchTools: async () => {
      set({ isLoading: true })
      try {
        const response = await fetch('/api/tools')
        const tools = await response.json()
        set({ tools, isLoading: false })
      } catch (error) {
        set({ isLoading: false })
        console.error('Failed to fetch tools:', error)
      }
    },

    addTool: async (toolData) => {
      try {
        const response = await fetch('/api/tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(toolData),
        })
        const newTool = await response.json()
        set((state) => ({ tools: [...state.tools, newTool] }))
      } catch (error) {
        console.error('Failed to add tool:', error)
        throw error
      }
    },

    updateTool: async (id, updates) => {
      try {
        const response = await fetch(`/api/tools/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        const updatedTool = await response.json()
        set((state) => ({
          tools: state.tools.map((tool) => (tool.id === id ? updatedTool : tool)),
          selectedTool: state.selectedTool?.id === id ? updatedTool : state.selectedTool,
        }))
      } catch (error) {
        console.error('Failed to update tool:', error)
        throw error
      }
    },

    deleteTool: async (id) => {
      try {
        await fetch(`/api/tools/${id}`, { method: 'DELETE' })
        set((state) => ({
          tools: state.tools.filter((tool) => tool.id !== id),
          selectedTool: state.selectedTool?.id === id ? null : state.selectedTool,
        }))
      } catch (error) {
        console.error('Failed to delete tool:', error)
        throw error
      }
    },

    selectTool: (tool) => set({ selectedTool: tool }),
  }))
)