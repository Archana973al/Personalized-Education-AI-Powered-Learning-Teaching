'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import '../../styles/auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { resetPassword, authError, authSuccess, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await resetPassword(email)
      setSuccess('Password reset email sent. Please check your inbox.')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {error && <div className="error-message">{error}</div>}
      {authError && <div className="error-message">{authError}</div>}
      {authSuccess && <div className="success-message">{authSuccess}</div>}
      {success && <div className="success-message">{success}</div>}
      
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
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      
      <div className="auth-links">
        <p>
          Remember your password? <Link href="/login">Login</Link>
        </p>
        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}