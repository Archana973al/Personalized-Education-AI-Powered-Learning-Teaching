'use client'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import '../styles/header.css'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="header">
      <Link href="/" className="logo">
        Adaptive Learning
      </Link>
      <nav>
        {user ? (
          <>
            <Link href="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
            <Link href="/quiz/math" className="btn btn-secondary ml-4">
              Try Quiz
            </Link>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}