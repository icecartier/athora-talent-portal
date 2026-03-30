import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <main className="pt-[44px] min-h-screen bg-cream main-content">
        <div className="p-5 main-pad">
          <Outlet />
        </div>
      </main>
      {/* Mobile bottom nav — hidden on desktop via CSS */}
      <div className="mobile-bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  )
}
