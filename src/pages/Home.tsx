import { Link } from 'react-router-dom'
import { MODULE_IDS, MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleCard from '../components/ModuleCard'
import Mascot from '../components/Mascot'
import styles from './Home.module.css'

export default function Home() {
  const { isModuleUnlocked, isModuleCompleted } = useProgress()
  const nextModuleId = MODULE_IDS.find(
    (id) => isModuleUnlocked(id) && !isModuleCompleted(id)
  )

  const nextModule = nextModuleId ? MODULES.find((m) => m.id === nextModuleId) : null

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>App Store Schule</h1>
          <p className={styles.heroSubtitle}>
            Lerne, wie Apps Geld verdienen – und wie du den Überblick behältst.
          </p>
        </div>
      </section>
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
      <Mascot
        mode="info"
        messages={
          nextModule
            ? [
                `Starte mit "${nextModule.title}" – dieses Modul ist als Nächstes dran.`,
                'Du kannst dein Tempo selbst bestimmen – mach Pausen, wenn du willst.',
                'Wenn du unsicher bist, kannst du jedes Modul später erneut öffnen.',
              ]
            : [
                'Du hast alle geplanten Module abgeschlossen. Schau dir deine Erfolge an!',
                'Du kannst Module wiederholen, um Inhalte zu festigen.',
              ]
        }
      />
    </div>
  )
}
