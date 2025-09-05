import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // init map
    mapRef.current = L.map('map').setView([20.5937,78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(mapRef.current);
    markerRef.current = L.marker([20.5937,78.9629]).addTo(mapRef.current);
    return () => mapRef.current.remove();
  }, []);

  const fetchByCity = async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather/city?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setWeather(data);
      if (data && data.coord) {
        const { lat, lon } = data.coord;
        mapRef.current.setView([lat, lon], 10);
        markerRef.current.setLatLng([lat, lon]);
      }
    } catch (err) {
      alert('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather/coords?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setWeather(data);
      if (data && data.coord) {
        mapRef.current.setView([lat, lon], 10);
        markerRef.current.setLatLng([lat, lon]);
      }
    } catch (err) {
      alert('Failed to fetch weather by coords');
    } finally {
      setLoading(false);
    }
  };

  const handleDetect = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchByCoords(pos.coords.latitude, pos.coords.longitude);
    }, (err) => alert('Permission denied or failed to get location'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) return alert('Enter a city');
    fetchByCity(city);
  };

  return (
    <div className="app">
      <h1>Weather App with Maps</h1>
      <div className="controls">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city name" />
          <button type="submit">Search</button>
        </form>
        <button onClick={handleDetect}>Detect My Location</button>
      </div>

      <div className="card">
        {loading && <div>Loading...</div>}
        {weather ? (
          weather.main ? (
            <div>
              <h2>{weather.name}, {weather.sys?.country}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Feels like: {weather.main.feels_like} °C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Condition: {weather.weather?.[0]?.description}</p>
            </div>
          ) : (
            <div>Error: {weather.message || 'No data'}</div>
          )
        ) : (
          <div>Search a city or detect location to see weather.</div>
        )}
      </div>

      <div id="map" className="map"></div>
    </div>
  );
}

export default App;
