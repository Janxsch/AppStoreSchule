import { MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import styles from './Erfolge.module.css'

export default function Erfolge() {
  const { completedModuleIds } = useProgress()
  const completed = MODULES.filter((m) => completedModuleIds.includes(m.id))

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Deine Erfolge</h1>
      <p className={styles.subtitle}>
        {completed.length === 0
          ? 'Noch keine Badges. Schließe Module ab!'
          : `Du hast ${completed.length} Badge${completed.length === 1 ? '' : 's'} verdient.`}
      </p>
      <div className={styles.badgeList}>
        {completed.map((m) => (
          <div key={m.id} className={styles.badge}>
            <span className={styles.badgeIcon}>🏆</span>
            <span className={styles.badgeName}>{m.badge}</span>
            <span className={styles.badgeModule}>{m.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
