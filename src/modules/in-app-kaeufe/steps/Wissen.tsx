import { useState } from 'react'
import styles from './Step.module.css'

const SCREENS = [
  {
    title: 'Was sind In-App-Käufe?',
    content: (
      <>
        <p>Zum Beispiel: Extra Leben, Spielwährung (Coins), Skins, Zeitverkürzung, Überraschungsboxen.</p>
        <p>Kurze Erklärung: Du kaufst Dinge direkt in der App – oft mit echtem Geld.</p>
      </>
    ),
  },
  {
    title: 'Warum machen Spiele das?',
    content: (
      <>
        <p>1000 Spieler × 2 € = viel Geld.</p>
        <p>Wenn viele Spieler kleine Beträge ausgeben, verdient die Firma viel Geld.</p>
      </>
    ),
  },
  {
    title: 'Woran erkennt man Kaufdruck?',
    content: (
      <>
        <p>„Nur heute!“, Countdown-Timer, „Deine Energie ist leer“, „Deine Freunde haben das auch“.</p>
        <p>Solche Tricks sollen dich zum schnellen Kaufen bringen.</p>
      </>
    ),
  },
]

type Props = { onNext: () => void }

export default function Wissen({ onNext }: Props) {
  const [screen, setScreen] = useState(0)
  const current = SCREENS[screen]

  return (
    <div className={styles.step}>
      <h2 className={styles.title}>{current.title}</h2>
      <div className={styles.textBlock}>{current.content}</div>
      {screen < SCREENS.length - 1 ? (
        <button type="button" className={styles.button} onClick={() => setScreen(screen + 1)}>
          Weiter
        </button>
      ) : (
        <button type="button" className={styles.button} onClick={onNext}>
          Zur Simulation
        </button>
      )}
    </div>
  )
}
