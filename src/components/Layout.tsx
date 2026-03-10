import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, padding: '16px', paddingBottom: 96, position: 'relative' }}>
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}
