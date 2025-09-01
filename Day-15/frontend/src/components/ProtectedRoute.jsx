import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export default function ProtectedRoute({ children }){
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      setAuthenticated(false)
      return
    }
    axios.get('http://localhost:4000/api/profile', { headers: { Authorization: 'Bearer ' + token } })
      .then(()=> { setAuthenticated(true) })
      .catch(()=> { setAuthenticated(false) })
      .finally(()=> setLoading(false))
  },[])

  if (loading) return <div>Checking authentication...</div>
  if (!authenticated) return <Navigate to="/login" replace />
  return children
}
