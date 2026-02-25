import { useState } from 'react'
import { useProgress } from '../store/ProgressContext'
import { TOTAL_MODULES } from '../data/modules'
import styles from './Profil.module.css'

export default function Profil() {
  const { completedCount, rank, reflectionAnswers } = useProgress()
  const [certificateOpen, setCertificateOpen] = useState(false)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profil</h1>

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

      {reflectionAnswers.length > 0 && (
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
      )}
    </div>
  )
}
