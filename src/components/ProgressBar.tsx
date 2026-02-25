import { TOTAL_MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import styles from './ProgressBar.module.css'

export default function ProgressBar() {
  const { completedCount } = useProgress()

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>
        Dein Fortschritt: {completedCount} von {TOTAL_MODULES} Modulen
      </p>
      <div className={styles.bar} role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={TOTAL_MODULES}>
        {Array.from({ length: TOTAL_MODULES }, (_, i) => (
          <div
            key={i}
            className={
              i < completedCount ? `${styles.dot} ${styles.done}` : styles.dot
            }
            aria-hidden
          >
            {i < completedCount && '✓'}
          </div>
        ))}
      </div>
    </div>
  )
}
