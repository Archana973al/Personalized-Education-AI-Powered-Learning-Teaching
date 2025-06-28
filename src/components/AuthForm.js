import { useState } from 'react'
import Link from 'next/link'

export default function AuthForm({ type, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit({ email, password })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'Sign In' : 'Create Account'}</h2>
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
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="auth-switch">
        {type === 'login' ? (
          <>
            Don't have an account? <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/login">Login</Link>
          </>
        )}
      </p>
    </div>
  )
}