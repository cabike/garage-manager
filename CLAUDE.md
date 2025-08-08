# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garage Manager is a Next.js 15 automotive management application with TypeScript, Tailwind CSS, and Zustand for state management. The app features user onboarding, car management, tool inventory, and project tracking capabilities.

## Development Commands

- `npm run dev` - Start development server with turbopack
- `npm run build` - Build for production (static export configured)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Build and export static files

## Architecture

### State Management
- Uses React hooks and useState for local state (Zustand is installed but not currently implemented)
- User authentication is handled in-memory with mock data
- All data is stored in component state arrays (cars, tools, users)

### Component Structure
- **GarageManager.tsx**: Main application component containing all functionality
- Single-file component approach with inline sub-components:
  - AuthScreen: Login/signup interface
  - OnboardingFlow: Multi-step user setup with 4 steps
  - Main garage dashboard with user-filtered data

### Data Models
Located in `src/types/index.ts`:
- **User**: Profile, experience level, interests, preferences
- **Car**: Vehicle details, specs, photos, maintenance status
- **Tool**: Inventory items with location and condition tracking

### Key Features
1. **User System**: Multi-user support with individual garage spaces
2. **Onboarding**: 4-step guided setup (profile → first car → tools → completion)
3. **Car Management**: Track multiple vehicles with photos and specifications
4. **Tool Recommendations**: Curated suggestions based on user interests and experience
5. **Responsive Design**: Mobile-first with Tailwind CSS and Lucide React icons

### Static Export Configuration
- Configured for Netlify deployment with `output: 'export'`
- Static file output to `dist/` directory
- Image optimization disabled for static hosting compatibility

### File Organization
```
src/
├── app/
│   ├── globals.css          # Tailwind styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (renders GarageManager)
├── components/
│   ├── GarageManager.tsx    # Main application component
│   ├── auth/                # Auth-related components (empty)
│   ├── onboarding/          # Onboarding components (empty)
│   └── ui/                  # Reusable UI components (empty)
├── lib/
│   ├── store.ts             # State management (minimal/empty)
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript interfaces
```

## Development Notes

- Build ignores TypeScript errors and ESLint warnings (configured for initial deployment)
- Path aliases configured with `@/` pointing to `src/`
- All functionality currently contained within the main GarageManager component
- No backend - uses in-memory mock data for demonstrations
- Zustand is installed but not implemented (using React state instead)