# Weather App Backend

This is a simple Express backend that proxies requests to OpenWeatherMap so you can keep your API key out of client code.

## Setup
1. `cd backend`
2. `npm install`
3. Set your OpenWeatherMap API key:
   - Export environment variable: `export OPENWEATHERMAP_API_KEY=your_key` (Linux/macOS)
   - Or replace 'YOUR_OPENWEATHERMAP_API_KEY' in index.js (not recommended)
4. `npm start`
