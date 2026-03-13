import { useState } from 'react'
import { useProgress } from '../store/ProgressContext'
import { TOTAL_MODULES } from '../data/modules'
import Mascot from '../components/Mascot'
import styles from './Profil.module.css'

export default function Profil() {
  const { completedCount, rank, reflectionAnswers } = useProgress()
  const [certificateOpen, setCertificateOpen] = useState(false)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profil</h1>

      <p className={styles.subtitle}>
        Hier siehst du, wie weit du in der App Store Schule bist.
      </p>

      <div className={styles.stats}>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Abgeschlossene Module</span>
          <span className={styles.statValue}>
            {completedCount} / {TOTAL_MODULES}
          </span>
        </div>
        <div className={styles.statTile}>
          <span className={styles.statLabel}>Dein Rang</span>
          <span className={styles.statValue}>{rank}</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.zertifikatButton}
        onClick={() => setCertificateOpen(!certificateOpen)}
      >
        Dein Zertifikat (Fortschritt)
      </button>

      {certificateOpen && (
        <div className={styles.zertifikat}>
          <p className={styles.zertifikatTitle}>App Store Schule – Fortschritt</p>
          <p className={styles.zertifikatText}>
            {completedCount} von {TOTAL_MODULES} Modulen abgeschlossen.
          </p>
          <p className={styles.zertifikatRank}>Rang: {rank}</p>
        </div>
      )}

      {reflectionAnswers.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gespeicherte Reflexionsantworten</h2>
          <p className={styles.hint}>Diese können später ausgewertet werden.</p>
          <ul className={styles.answerList}>
            {reflectionAnswers.map((a, i) => (
              <li key={i} className={styles.answerItem}>
                <strong>{a.question}</strong>
                <span>{a.answer}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className={styles.noAnswers}>
          Hier werden später deine Antworten aus den Modulen angezeigt.
        </p>
      )}
      <Mascot
        mode="neutral"
        messages={[
          `Du bist aktuell "${rank}". Jedes abgeschlossene Modul verbessert dein Zertifikat.`,
          'Nutze dein Profil, um deinen Lernfortschritt im Blick zu behalten.',
        ]}
      />
    </div>
  )
}
