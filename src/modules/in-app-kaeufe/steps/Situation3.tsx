import { useState } from 'react'
import { useProgress } from '../../../store/ProgressContext'
import type { ModuleId } from '../../../data/modules'
import styles from './Simulation.module.css'

type Props = { moduleId: ModuleId; onNext: () => void }

/** Lootbox: Ergebnis fest "Gewöhnlich" für Lernsituation */
const LOOTBOX_RESULT = 'Gewöhnlich'

export default function Situation3({ moduleId, onNext }: Props) {
  const { addSimulationChoice } = useProgress()
  const [showResult, setShowResult] = useState(false)

  const handleBuy = () => {
    addSimulationChoice(moduleId, 'lootbox', 'buy', 2.99)
    setShowResult(true)
  }

  const handleSkip = () => {
    addSimulationChoice(moduleId, 'lootbox', 'skip')
    setShowResult(true)
  }

  if (showResult) {
    return (
      <div className={styles.wrap}>
        <p className={styles.feedback}>
          Du hast bekommen: <strong>{LOOTBOX_RESULT}</strong>.
        </p>
        <p className={styles.neutral}>
          Man weiß vorher nicht, was man bekommt. Das nennt man Zufallssystem. Je öfter man kauft, desto mehr Geld wird ausgegeben – ohne Garantie auf etwas Besonderes.
        </p>
        <button type="button" className={styles.button} onClick={onNext}>
          Zur Auswertung
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.context}>Mysteriöse Box – vielleicht etwas Seltenes! 2,99 €</p>
      <div className={styles.options}>
        <button type="button" className={styles.option} onClick={handleSkip}>
          Nicht kaufen
        </button>
        <button type="button" className={styles.optionBuy} onClick={handleBuy}>
          Öffnen (2,99 €)
        </button>
      </div>
    </div>
  )
}
