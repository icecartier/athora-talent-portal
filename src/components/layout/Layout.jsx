import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <main className="pt-[44px] min-h-screen bg-cream">
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
