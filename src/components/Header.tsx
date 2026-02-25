import { useProgress } from '../store/ProgressContext'
import { TOTAL_MODULES } from '../data/modules'
import styles from './Header.module.css'

export default function Header() {
  const { completedCount, rank } = useProgress()

  return (
    <header className={styles.header}>
      <div className={styles.mascot}>
        <img
          src="/robot-mascot.png"
          alt="Maskottchen"
          className={styles.robotImg}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
            const next = (e.target as HTMLImageElement).nextElementSibling
            if (next) (next as HTMLElement).style.display = 'block'
          }}
        />
        <div className={styles.robotPlaceholder} aria-hidden>
          🤖
        </div>
      </div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>App Store Schule</h1>
        <p className={styles.subtitle}>
          {completedCount} von {TOTAL_MODULES} Modulen · {rank}
        </p>
      </div>
    </header>
  )
}
