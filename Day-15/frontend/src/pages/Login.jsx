import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('user@example.com')
  const [password,setPassword]=useState('password123')
  const [error,setError]=useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:4000/api/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div style={{maxWidth:400, margin:'40px auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:8}}>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:8}}>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%'}} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p>Use <strong>user@example.com</strong> / <strong>password123</strong></p>
    </div>
  )
}
