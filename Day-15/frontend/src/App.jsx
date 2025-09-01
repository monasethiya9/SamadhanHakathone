import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div style={{maxWidth:800, margin:'40px auto', padding:20}}>
      <nav style={{display:'flex', gap:10, marginBottom:20}}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div><h2>Welcome</h2><p>Use login to access protected dashboard</p></div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
