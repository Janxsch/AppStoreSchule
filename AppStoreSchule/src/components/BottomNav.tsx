import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        end
      >
        <span className={styles.icon} aria-hidden>🏠</span>
        <span>Start</span>
      </NavLink>
      <NavLink
        to="/erfolge"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        <span className={styles.icon} aria-hidden>🏆</span>
        <span>Erfolge</span>
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        <span className={styles.icon} aria-hidden>👤</span>
        <span>Profil</span>
      </NavLink>
    </nav>
  )
}
