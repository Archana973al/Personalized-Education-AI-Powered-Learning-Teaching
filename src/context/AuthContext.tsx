'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../firebase/config'
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  AuthError,
  sendPasswordResetEmail
} from 'firebase/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<{ needsVerification: boolean }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  resendVerification: () => Promise<void>
  authError: string | null
  authSuccess: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      setAuthError(null)
    })
    return () => unsubscribe()
  }, [])

  const clearMessages = () => {
    setAuthError(null)
    setAuthSuccess(null)
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    clearMessages()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user)
        throw new Error('verify-email')
      }
      
      router.push('/dashboard')
    } catch (error: unknown) {
      setLoading(false)
      let errorMessage = 'Login failed. Please try again.'
      
      if (error instanceof Error) {
        if (error.message === 'verify-email') {
          errorMessage = 'Please verify your email first. A new verification link has been sent.'
          setAuthSuccess(errorMessage)
        } else if (typeof error === 'object' && 'code' in error) {
          const authError = error as AuthError
          switch (authError.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorMessage = 'Invalid email or password'
              break
            case 'auth/too-many-requests':
              errorMessage = 'Account temporarily locked. Try again later or reset your password.'
              break
            case 'auth/user-disabled':
              errorMessage = 'Account disabled. Please contact support.'
              break
          }
        }
        setAuthError(errorMessage)
        throw new Error(errorMessage)
      }
    }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    clearMessages()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      setAuthSuccess('Registration successful! Please check your email to verify your account.')
      
      return { needsVerification: true }
    } catch (error: unknown) {
      setLoading(false)
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error instanceof Error && typeof error === 'object' && 'code' in error) {
        const authError = error as AuthError
        switch (authError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email already in use. Try logging in or resetting your password.'
            break
          case 'auth/weak-password':
            errorMessage = 'Password must be at least 6 characters'
            break
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address'
            break
        }
      }
      
      setAuthError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      setAuthError('Failed to logout. Please try again.')
      throw new Error('Failed to logout. Please try again.')
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    clearMessages()
    try {
      await sendPasswordResetEmail(auth, email)
      setAuthSuccess('Password reset email sent. Please check your inbox.')
    } catch (error: unknown) {
      let errorMessage = 'Failed to send password reset email.'
      if (error instanceof Error && typeof error === 'object' && 'code' in error) {
        const authError = error as AuthError
        if (authError.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email address.'
        }
      }
      setAuthError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resendVerification = async () => {
    if (!user) return
    
    setLoading(true)
    clearMessages()
    try {
      await sendEmailVerification(user)
      setAuthSuccess('Verification email resent. Please check your inbox.')
    } catch (error) {
      setAuthError('Failed to resend verification email. Please try again.')
      throw new Error('Failed to resend verification email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      resetPassword,
      resendVerification,
      authError,
      authSuccess
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}