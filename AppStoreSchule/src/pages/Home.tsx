import { Link } from 'react-router-dom'
import { MODULE_IDS, MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleCard from '../components/ModuleCard'
import robImage from '../assets/rob.png'
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
          <p className={styles.heroBadge}>Hallo, ich bin Rob!</p>
          <h1 className={styles.heroTitle}>Dein App-Store-Führerschein</h1>
          <p className={styles.heroSubtitle}>
            Gemeinsam mit Rob lernst du, wie Apps, In-App-Käufe und Werbung funktionieren –
            Schritt für Schritt und kindgerecht erklärt.
          </p>
          <ProgressBar />
          <Link
            to={nextModuleId ? `/module/${nextModuleId}` : '#'}
            className={styles.heroButton}
            style={!nextModuleId ? { opacity: 0.7, pointerEvents: 'none' } : undefined}
          >
            <span className={styles.heroButtonMain}>
              {nextModuleId ? 'Mit Rob weiterlernen' : 'Bald geht es los'}
            </span>
            {nextModule && (
              <span className={styles.heroButtonSub}>{nextModule.title}</span>
            )}
          </Link>
        </div>
        <div className={styles.heroImageWrapper}>
          <img
            src={robImage}
            alt="Rob, dein Lern-Begleiter"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.modulesSection}>
        <h2 className={styles.sectionTitle}>Deine Lernabenteuer</h2>
        <p className={styles.sectionSubtitle}>
          Wähle ein Modul aus und entdecke mit Rob neue Tipps rund um Apps und Spiele.
        </p>
        <div className={styles.grid}>
          {MODULES.map((m, i) => (
            <ModuleCard key={m.id} id={m.id} title={m.title} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
