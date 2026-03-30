import { NavLink } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'
import { creator } from '../../data/mockCreator'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/content', label: 'Content' },
  { to: '/performance', label: 'Performance' },
  { to: '/growth', label: 'Growth Plan' },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/profile', label: 'Profile' },
]

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[44px] bg-white border-b-2 border-cream-border flex items-center px-5 gap-4 z-50" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
      {/* Logo */}
      <span className="text-[15px] font-extrabold tracking-tight text-text-main mr-3 whitespace-nowrap">
        ATHORA<span className="text-primary">.</span>
      </span>

      {/* Nav */}
      <nav className="flex items-center gap-1 flex-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive
                ? 'bg-dark text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors duration-150'
                : 'text-muted text-[12px] font-medium px-3 py-1.5 rounded-full hover:bg-black/5 hover:text-text-main transition-colors duration-150'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="w-7 h-7 bg-cream border border-cream-border rounded-lg flex items-center justify-center text-text-sub hover:bg-cream-deep transition-colors">
          <Bell size={14} strokeWidth={2} />
        </button>
        <button className="w-7 h-7 bg-cream border border-cream-border rounded-lg flex items-center justify-center text-text-sub hover:bg-cream-deep transition-colors">
          <Search size={14} strokeWidth={2} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-white ml-1">
          {creator.avatarInitials}
        </div>
      </div>
    </header>
  )
}
