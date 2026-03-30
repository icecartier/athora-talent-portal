import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Zap, BarChart2, TrendingUp, Briefcase, User } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard },
  { to: '/content', icon: Zap },
  { to: '/performance', icon: BarChart2 },
  { to: '/growth', icon: TrendingUp },
  { to: '/opportunities', icon: Briefcase },
  { to: '/profile', icon: User },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-[50px] bottom-0 w-[52px] bg-cream border-r border-cream-border flex flex-col items-center pt-3 gap-1 z-40">
      {navItems.map(({ to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 ${
              isActive
                ? 'bg-primary-light text-primary'
                : 'text-muted-light hover:bg-black/5 hover:text-text-sub'
            }`
          }
        >
          {({ isActive }) => <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />}
        </NavLink>
      ))}
    </aside>
  )
}
