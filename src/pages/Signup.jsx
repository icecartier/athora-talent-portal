import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, displayName)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#F0EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.03em', marginBottom: 16 }}>
            ATHORA<span style={{ color: '#7C3AED' }}>.</span>
          </p>
          <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 16, padding: '32px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <span style={{ fontSize: 20 }}>✓</span>
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8 }}>Check your email</p>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Link to="/login" style={{
              display: 'inline-block', padding: '10px 24px', fontSize: 13, fontWeight: 600,
              background: '#7C3AED', color: 'white', borderRadius: 10, textDecoration: 'none',
            }}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
            ATHORA<span style={{ color: '#7C3AED' }}>.</span>
          </p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Create your creator account</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #DDD9CF', borderRadius: 16, padding: '32px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#DC2626' }}>{error}</p>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 6 }}>Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #DDD9CF',
                  borderRadius: 10, outline: 'none', background: '#FAFAF8', color: '#111',
                  boxSizing: 'border-box',
                }}
                placeholder="Jordan Finley"
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #DDD9CF',
                  borderRadius: 10, outline: 'none', background: '#FAFAF8', color: '#111',
                  boxSizing: 'border-box',
                }}
                placeholder="you@example.com"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#333', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #DDD9CF',
                  borderRadius: 10, outline: 'none', background: '#FAFAF8', color: '#111',
                  boxSizing: 'border-box',
                }}
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px 0', fontSize: 14, fontWeight: 700,
                background: loading ? '#A78BFA' : '#7C3AED', color: 'white', border: 'none',
                borderRadius: 10, cursor: loading ? 'default' : 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
