import { Link } from 'react-router-dom'
import styles from './BadgeScreen.module.css'

type Props = { badge: string }

export default function BadgeScreen({ badge }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.badgeIcon}>🏆</div>
      <h1 className={styles.title}>Badge freigeschaltet!</h1>
      <p className={styles.badgeName}>{badge}</p>
      <Link to="/" className={styles.button}>
        Zurück zum Start
      </Link>
    </div>
  )
}
