import { useState } from 'react'
import type { ModuleId } from '../../data/modules'
import { useProgress } from '../../store/ProgressContext'
import Intro from './steps/Intro'
import Wissen from './steps/Wissen'
import Simulation from './steps/Simulation'
import Auswertung from './steps/Auswertung'
import Quiz from './steps/Quiz'
import BadgeScreen from './steps/BadgeScreen'
import styles from './InAppKaeufeModule.module.css'

type Step = 'intro' | 'wissen' | 'simulation' | 'auswertung' | 'quiz' | 'badge'

type Props = { moduleId: ModuleId; title: string; badge: string }

export default function InAppKaeufeModule({ moduleId, title, badge }: Props) {
  const [step, setStep] = useState<Step>('intro')
  const { completeModule } = useProgress()

  const next = (s: Step) => {
    if (s === 'badge') {
      completeModule(moduleId)
    }
    setStep(s)
  }

  return (
    <div className={styles.wrap}>
      {step === 'intro' && (
        <Intro title={title} onNext={() => next('wissen')} />
      )}
      {step === 'wissen' && (
        <Wissen onNext={() => next('simulation')} />
      )}
      {step === 'simulation' && (
        <Simulation moduleId={moduleId} onNext={() => next('auswertung')} />
      )}
      {step === 'auswertung' && (
        <Auswertung moduleId={moduleId} onNext={() => next('quiz')} />
      )}
      {step === 'quiz' && (
        <Quiz
          onPass={() => next('badge')}
          onFail={() => next('simulation')}
        />
      )}
      {step === 'badge' && (
        <BadgeScreen badge={badge} />
      )}
    </div>
  )
}
