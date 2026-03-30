import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // Demo mode — no Supabase configured, show app freely
  if (!supabase) return children

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F0EDE6',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
            ATHORA<span style={{ color: '#7C3AED' }}>.</span>
          </p>
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}
