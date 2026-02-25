import { Link } from 'react-router-dom'
import { MODULE_IDS, MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleCard from '../components/ModuleCard'
import styles from './Home.module.css'

export default function Home() {
  const { isModuleUnlocked, isModuleCompleted } = useProgress()
  const nextModuleId = MODULE_IDS.find(
    (id) => isModuleUnlocked(id) && !isModuleCompleted(id)
  )

  const nextModule = nextModuleId ? MODULES.find((m) => m.id === nextModuleId) : null

  return (
    <div className={styles.page}>
      <ProgressBar />
      <Link
        to={nextModuleId ? `/module/${nextModuleId}` : '#'}
        className={styles.weiterlernen}
        style={!nextModuleId ? { opacity: 0.7, pointerEvents: 'none' } : undefined}
      >
        <span className={styles.weiterlernenText}>Weiterlernen</span>
        {nextModule && (
          <span className={styles.weiterlernenSub}>
            {nextModule.title}
          </span>
        )}
      </Link>
      <h2 className={styles.sectionTitle}>Module</h2>
      <div className={styles.grid}>
        {MODULES.map((m, i) => (
          <ModuleCard key={m.id} id={m.id} title={m.title} index={i} />
        ))}
      </div>
    </div>
  )
}
