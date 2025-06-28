'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import '../../styles/auth.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')
  const { register, authError, authSuccess, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const result = await register(email, password)
      if (result.needsVerification) {
        setRegisteredEmail(email)
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>We've sent a verification email to <strong>{registeredEmail}</strong></p>
          <p>Please check your inbox and verify your email to continue.</p>
          {authSuccess && <div className="success-notice">{authSuccess}</div>}
          <div className="success-actions">
            <Link href="/login" className="btn btn-primary">
              Go to Login
            </Link>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSuccess(false)
                setEmail('')
                setPassword('')
              }}
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      {authError && <div className="error-message">{authError}</div>}
      {authSuccess && <div className="success-message">{authSuccess}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
          />
          <small className="password-hint">Minimum 6 characters</small>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div className="auth-links">
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}