import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Layers, TrendingUp, Target, Zap, User } from 'lucide-react'

const navItems = [
  { to: '/',             label: 'Home',        Icon: LayoutDashboard, end: true },
  { to: '/content',      label: 'Content',     Icon: Layers },
  { to: '/performance',  label: 'Performance', Icon: TrendingUp },
  { to: '/growth',       label: 'Growth',      Icon: Target },
  { to: '/opportunities',label: 'Deals',       Icon: Zap },
  { to: '/profile',      label: 'Profile',     Icon: User },
]

export default function BottomNav() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'white',
      borderTop: '1px solid #DDD9CF',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: '0 -2px 16px rgba(0,0,0,0.07)',
    }}>
      {navItems.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 4px',
            gap: 3,
            color: isActive ? '#7C3AED' : '#AAA',
            textDecoration: 'none',
            transition: 'color 0.15s',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span style={{
                fontSize: 9, fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.02em',
              }}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
