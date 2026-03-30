import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0EDE6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
            ATHORA<span style={{ color: '#7C3AED' }}>.</span>
          </p>
          <p style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Sign in to your creator dashboard</p>
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
                style={{
                  width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid #DDD9CF',
                  borderRadius: 10, outline: 'none', background: '#FAFAF8', color: '#111',
                  boxSizing: 'border-box',
                }}
                placeholder="Your password"
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 20 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#7C3AED', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
