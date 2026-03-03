import { useState } from 'react'
import styles from './Quiz.module.css'

const QUESTIONS: { question: string; options: string[]; correctIndex: number }[] = [
  {
    question: 'Warum sind manche Spiele kostenlos?',
    options: [
      'Weil sie kein Geld brauchen',
      'Weil sie durch Käufe im Spiel Geld verdienen',
      'Weil Werbung verboten ist',
    ],
    correctIndex: 1,
  },
  {
    question: 'Was sind In-App-Käufe?',
    options: [
      'Ingame Käufe durch echtes Geld.',
      'Ingame Käufe durch erspieltes Geld.',
      'Belohnungen durch Quests.',
    ],
    correctIndex: 0,
  },
  {
    question: 'Woran erkennt man Kaufdruck?',
    options: [
      'Wenn das Spiel die Option bietet einen Skin zu kaufen, der immer im Shop ist.',
      'Wenn das Spiel durch künstliche Verknappung (Zeit, Limitiert, etc.) zum Kauf animiert.',
      'Wenn das Spiel die Kaufoptionen versteckt.',
    ],
    correctIndex: 1,
  },
  {
    question: 'Was ist eine Lootbox?',
    options: [
      'Eine Belohnung, bei der man vorher nicht weiß, was man bekommt. Oft auch in Seltenheiten unterteilt.',
      'Ein Kauf bei dem man zusätzliche EP bekommt.',
      'Ein Spielmodus, bei dem man eine zufällige Challenge erfüllen muss.',
    ],
    correctIndex: 0,
  },
  {
    question: 'Warum nutzen Spiele Countdown-Timer?',
    options: [
      'Um mehr Spaß und Spannung zu erzeugen.',
      'Damit die Server das besser verarbeiten können.',
      'Um Druck auf die Spielenden zu erzeugen.',
    ],
    correctIndex: 2,
  },
]

const MIN_CORRECT = 4

type Props = { onPass: () => void; onFail: () => void }

export default function Quiz({ onPass, onFail }: Props) {
  const [current, setCurrent] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const q = QUESTIONS[current]
  const isLast = current === QUESTIONS.length - 1

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)
    if (index === q.correctIndex) {
      setCorrectCount((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (!isLast) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      if (correctCount + (selected === q.correctIndex ? 1 : 0) >= MIN_CORRECT) {
        onPass()
      } else {
        onFail()
      }
    }
  }

  const currentCorrect = selected !== null && selected === q.correctIndex
  const finalCorrectCount =
    isLast && showResult ? correctCount + (currentCorrect ? 1 : 0) : null

  if (finalCorrectCount !== null) {
    const passed = finalCorrectCount >= MIN_CORRECT
    return (
      <div className={styles.wrap}>
        <h2 className={styles.title}>
          {passed ? 'Modul abgeschlossen – Kauf-Fallen erkannt!' : 'Noch nicht bestanden'}
        </h2>
        <p className={styles.score}>
          {finalCorrectCount} von {QUESTIONS.length} richtig. Du brauchst mindestens {MIN_CORRECT}.
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={passed ? onPass : onFail}
        >
          {passed ? 'Badge abholen' : 'Modul wiederholen'}
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.progress}>
        Frage {current + 1} von {QUESTIONS.length}
      </p>
      <h2 className={styles.question}>{q.question}</h2>
      <div className={styles.options}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className={
              showResult
                ? i === q.correctIndex
                  ? styles.correct
                  : selected === i
                    ? styles.wrong
                    : styles.option
                : styles.option
            }
            onClick={() => handleAnswer(i)}
            disabled={showResult}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <button type="button" className={styles.button} onClick={handleNext}>
          {isLast ? 'Ergebnis anzeigen' : 'Weiter'}
        </button>
      )}
    </div>
  )
}
