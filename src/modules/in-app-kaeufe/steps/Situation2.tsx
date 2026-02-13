import { useState } from 'react'
import { useProgress } from '../../../store/ProgressContext'
import type { ModuleId } from '../../../data/modules'
import styles from './Simulation.module.css'

type Props = { moduleId: ModuleId; onNext: () => void }

export default function Situation2({ moduleId, onNext }: Props) {
  const { addSimulationChoice } = useProgress()
  const [showFeedback, setShowFeedback] = useState(false)

  const handleBuy = () => {
    addSimulationChoice(moduleId, 'sonderangebot', 'buy', 4.99)
    setShowFeedback(true)
  }

  const handleSkip = () => {
    addSimulationChoice(moduleId, 'sonderangebot', 'skip')
    setShowFeedback(true)
  }

  if (showFeedback) {
    return (
      <div className={styles.wrap}>
        <p className={styles.feedback}>
          Das Angebot erscheint in vielen Spielen immer wieder. Manche Spiele nutzen künstliche Verknappung.
        </p>
        <button type="button" className={styles.button} onClick={onNext}>
          Weiter
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        Nur noch 10 Sekunden! Super-Schwert 4,99 €
      </div>
      <div className={styles.options}>
        <button type="button" className={styles.option} onClick={handleSkip}>
          Nicht kaufen
        </button>
        <button type="button" className={styles.optionBuy} onClick={handleBuy}>
          Jetzt kaufen (4,99 €)
        </button>
      </div>
    </div>
  )
}
