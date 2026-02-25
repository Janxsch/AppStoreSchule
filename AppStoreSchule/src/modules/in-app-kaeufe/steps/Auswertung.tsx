import { useState } from 'react'
import { useProgress } from '../../../store/ProgressContext'
import type { ModuleId } from '../../../data/modules'
import styles from './Auswertung.module.css'

const REFLECTION_OPTIONS = [
  'Ich wollte schneller sein',
  'Ich wollte etwas Besonderes',
  'Ich wollte nicht warten',
  'Ich wollte gewinnen',
]

type Props = { moduleId: ModuleId; onNext: () => void }

export default function Auswertung({ moduleId, onNext }: Props) {
  const { getSimulationSpentForModule, simulationChoices, addReflectionAnswer } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const spent = getSimulationSpentForModule(moduleId)
  const buyCount = simulationChoices.filter((c) => c.moduleId === moduleId && c.amountSpent != null).length

  const handleSubmit = () => {
    if (selected) {
      addReflectionAnswer(moduleId, 'Warum hast du dich so entschieden?', selected)
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className={styles.wrap}>
        <p className={styles.neutral}>
          Spiele nutzen Zeitdruck, Belohnungen und Seltenheit, um Spieler zum Kaufen zu motivieren.
        </p>
        <button type="button" className={styles.button} onClick={onNext}>
          Zum Quiz
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Dein Bericht</h2>
      <p className={styles.report}>
        Du hast {buyCount}-mal gekauft. Das wären <strong>{spent.toFixed(2)} €</strong> gewesen.
      </p>
      <p className={styles.question}>Warum hast du dich so entschieden?</p>
      <div className={styles.options}>
        {REFLECTION_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={selected === opt ? styles.optionSelected : styles.option}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={handleSubmit}
        disabled={!selected}
      >
        Weiter
      </button>
    </div>
  )
}
