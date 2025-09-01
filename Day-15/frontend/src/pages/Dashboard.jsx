import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    axios.get('http://localhost:4000/api/profile', { headers: { Authorization: 'Bearer ' + token } })
      .then(res => setProfile(res.data))
      .catch(()=> {
        localStorage.removeItem('token')
        navigate('/login')
      })
  },[navigate])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {profile ? (
        <div>
          <p>Welcome, {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : <p>Loading profile...</p>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
