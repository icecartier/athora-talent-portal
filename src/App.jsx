import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ContentEngine from './pages/ContentEngine'
import Performance from './pages/Performance'
import GrowthPlan from './pages/GrowthPlan'
import Opportunities from './pages/Opportunities'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected app routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Dashboard />} />
        <Route path="/content" element={<ContentEngine />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/growth" element={<GrowthPlan />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
