import { useState } from 'react'
import { useProgress } from '../../../store/ProgressContext'
import type { ModuleId } from '../../../data/modules'
import styles from './Simulation.module.css'

type Props = { moduleId: ModuleId; onNext: () => void }

export default function Situation1({ moduleId, onNext }: Props) {
  const { addSimulationChoice } = useProgress()
  const [chosen, setChosen] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleBuy = () => {
    addSimulationChoice(moduleId, 'energie', 'buy', 1.99)
    setChosen('buy')
    setShowFeedback(true)
  }

  const handleWait = () => {
    addSimulationChoice(moduleId, 'energie', 'wait')
    setChosen('wait')
    setShowFeedback(true)
  }

  if (showFeedback) {
    return (
      <div className={styles.wrap}>
        <p className={styles.feedback}>
          {chosen === 'buy'
            ? 'Du hast Geld genutzt, um nicht zu warten.'
            : 'Du hast Geduld genutzt statt Geld.'}
        </p>
        <p className={styles.neutral}>Keine Bewertung – nur Transparenz.</p>
        <button type="button" className={styles.button} onClick={onNext}>
          Weiter
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.context}>Deine Energie ist leer!</p>
      <div className={styles.options}>
        <button type="button" className={styles.option} onClick={handleWait}>
          3 Stunden warten
        </button>
        <button type="button" className={styles.optionBuy} onClick={handleBuy}>
          Sofort weiterspielen für 1,99 €
        </button>
      </div>
    </div>
  )
}

