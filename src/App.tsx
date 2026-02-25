import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Erfolge from './pages/Erfolge'
import Profil from './pages/Profil'
import ModulePage from './pages/ModulePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/erfolge" element={<Erfolge />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
      </Route>
    </Routes>
  )
}
