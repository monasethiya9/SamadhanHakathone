# Weather App Fullstack (React + Node.js)

This repository contains:
- backend/: Express server that proxies OpenWeatherMap API requests.
- frontend/: React app with Leaflet map and geolocation.

## Quick start
1. Start backend:
   - cd backend
   - npm install
   - set OPENWEATHERMAP_API_KEY env var
   - npm start
2. Start frontend:
   - cd frontend
   - npm install
   - npm start

The frontend expects the backend to be available at http://localhost:5000 (same-origin). In production deploy both and set proper proxy or CORS.
