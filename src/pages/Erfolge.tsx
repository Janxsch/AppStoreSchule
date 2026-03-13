import { MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import Mascot from '../components/Mascot'
import styles from './Erfolge.module.css'

export default function Erfolge() {
  const { completedModuleIds } = useProgress()
  const completed = MODULES.filter((m) => completedModuleIds.includes(m.id))
  const hasBadges = completed.length > 0

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Deine Erfolge</h1>
      <p className={styles.subtitle}>
        {completed.length === 0
          ? 'Noch keine Badges. Schließe Module ab!'
          : `Du hast ${completed.length} Badge${completed.length === 1 ? '' : 's'} verdient.`}
      </p>
      {hasBadges ? (
        <div className={styles.badgeList}>
          {completed.map((m) => (
            <div key={m.id} className={styles.badge}>
              <span className={styles.badgeIcon}>🏆</span>
              <span className={styles.badgeName}>{m.badge}</span>
              <span className={styles.badgeModule}>{m.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyCard}>
          <p className={styles.emptyTitle}>Noch keine Badges</p>
          <p className={styles.emptyText}>
            Starte mit dem ersten Modul auf der Startseite. Für jedes abgeschlossene Modul gibt es
            ein neues Badge.
          </p>
        </div>
      )}
      <Mascot
        mode={hasBadges ? 'celebrate' : 'info'}
        messages={
          hasBadges
            ? [
                'Stark! Du hast schon Badges gesammelt. Such dir das nächste Modul aus, um noch mehr freizuschalten.',
                'Schau dir an, welche Themen du schon gut kannst – und wo du noch üben willst.',
              ]
            : [
                'Noch keine Badges – kein Problem. Starte einfach mit dem ersten Modul auf der Startseite.',
                'Jedes abgeschlossene Modul schaltet ein neues Badge frei.',
              ]
        }
      />
    </div>
  )
}
