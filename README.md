# Freemium & Flash USDT Mobile App

Mobile application for USDT transfers built with Expo + React Native + NativeWind.

## Features

- Age verification gate (18+)
- Key-based authentication with tiered access (Free/Pro/Enterprise)
- Dashboard with tier-specific features
- API integration with likhonsheikh.xyz
- Dark theme with emerald accent colors

## Tech Stack

- **Framework**: Expo SDK 52
- **UI**: React Native + NativeWind (Tailwind CSS)
- **Navigation**: Expo Router
- **Storage**: Expo Secure Store
- **Icons**: Lucide React Native

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Building for Production

### APK for Android

```bash
# Login to EAS
npx eas-cli login

# Build APK
npx eas-cli build --platform android --profile apk
```

### App Bundle for Play Store

```bash
npx eas-cli build --platform android --profile production
```

## Project Structure

```
app/
  _layout.tsx      # Root layout with navigation
  index.tsx        # Verification screen
  dashboard.tsx    # Main dashboard
components/
  AgeGate.tsx      # Age verification component
  ui/              # Reusable UI components
lib/
  api.ts           # API client
  storage.ts       # Secure storage utilities
```

## Configuration

- **EAS Project ID**: f982fb5c-fe4f-42fa-9621-a7f1d19dd745
- **Owner**: likhonsheikhdevs-organization
- **Package**: com.freemiumusdt.app

## License

Proprietary - All rights reserved

© 2025 Freemium & Flash USDT
