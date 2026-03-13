import { useMemo, useState } from 'react'
import type { ModuleId } from '../../data/modules'
import { useProgress } from '../../store/ProgressContext'
import Mascot, { type MascotMode } from '../../components/Mascot'
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

  const steps: { id: Step; label: string; emoji: string }[] = useMemo(
    () => [
      { id: 'intro', label: 'Start', emoji: '🎮' },
      { id: 'wissen', label: 'Wissen', emoji: '💡' },
      { id: 'simulation', label: 'Spiel', emoji: '🕹️' },
      { id: 'auswertung', label: 'Auswertung', emoji: '📊' },
      { id: 'quiz', label: 'Quiz', emoji: '✅' },
      { id: 'badge', label: 'Badge', emoji: '🏆' },
    ],
    [],
  )

  const currentIndex = steps.findIndex((s) => s.id === step)
  const progressPercent =
    currentIndex >= 0 ? (currentIndex / Math.max(steps.length - 1, 1)) * 100 : 0

  const mascotConfig = useMemo((): { mode: MascotMode; messages: string[] } => {
    switch (step) {
      case 'intro':
        return {
          mode: 'neutral',
          messages: [
            'Viele Spiele sind kostenlos, verdienen aber Geld mit In-App-Käufen. Schau dir das genau an.',
            'Nimm dir Zeit zum Lesen – du musst nichts kaufen, um gut zu spielen.',
          ],
        }
      case 'wissen':
        return {
          mode: 'info',
          messages: [
            'Hier lernst du die wichtigsten Begriffe zu In-App-Käufen kennen.',
            'Überlege bei jedem Beispiel: Hast du so etwas schon einmal im Spiel gesehen?',
          ],
        }
      case 'simulation':
        return {
          mode: 'info',
          messages: [
            'Stell dir vor, es wäre echtes Geld. Würdest du wirklich so oft kaufen?',
            'Es gibt kein richtig oder falsch – wichtig ist, dass du bewusst entscheidest.',
          ],
        }
      case 'auswertung':
        return {
          mode: 'info',
          messages: [
            'Schau dir an, wie viel Geld zusammengekommen wäre. Manchmal sind es mehr kleine Beträge, als man denkt.',
            'Sei ehrlich bei deiner Antwort – sie hilft dir zu verstehen, warum du im Spiel kaufst.',
          ],
        }
      case 'quiz':
        return {
          mode: 'info',
          messages: [
            'Im Quiz kannst du zeigen, wie gut du Kauf-Tricks erkennst.',
            'Lies die Fragen genau – oft versteckt sich der Trick in einem kleinen Wort.',
          ],
        }
      case 'badge':
        return {
          mode: 'celebrate',
          messages: [
            'Stark! Du hast das Modul zu In-App-Käufen geschafft.',
            'Nutze dein Wissen jetzt in echten Spielen und lass dich nicht so leicht zum Kaufen überreden.',
          ],
        }
      default:
        return { mode: 'neutral', messages: [] }
    }
  }, [step])

  const next = (s: Step) => {
    if (s === 'badge') {
      completeModule(moduleId)
    }
    setStep(s)
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.moduleTitle}>{title}</p>
        <div className={styles.progressBarOuter} aria-hidden="true">
          <div
            className={styles.progressBarInner}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.stepTrack} aria-hidden="true">
          <div className={styles.stepDotsRow}>
            {steps.map((s, index) => {
              const isDone = currentIndex !== -1 && index < currentIndex
              const isActive = index === currentIndex
              const statusClass = isDone
                ? styles.stepDotDone
                : isActive
                  ? styles.stepDotActive
                  : styles.stepDotUpcoming

              return (
                <div
                  key={s.id}
                  className={`${styles.stepDot} ${statusClass}`}
                >
                  <span className={styles.stepDotNumber}>{index + 1}</span>
                </div>
              )
            })}
          </div>
          <div className={styles.stepLabelsRow}>
            {steps.map((s, index) => (
              <span
                key={s.id}
                className={`${styles.stepLabel} ${
                  index === currentIndex ? styles.stepLabelActive : ''
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.body}>
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

      <Mascot mode={mascotConfig.mode} messages={mascotConfig.messages} autoHideMs={8000} />
    </div>
  )
}
