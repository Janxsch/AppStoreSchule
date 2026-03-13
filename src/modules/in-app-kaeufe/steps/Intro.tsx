import { useState } from 'react'
import styles from './Step.module.css'

type Props = { title: string; onNext: () => void }

export default function Intro({ title, onNext }: Props) {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1)

  const goNextScreen = () => {
    if (screen < 4) {
      setScreen((s) => (s + 1) as 2 | 3 | 4)
    } else {
      onNext()
    }
  }

  return (
    <div className={styles.step}>
      {screen === 1 && (
        <>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>Warum kostenlose Spiele manchmal doch Geld kosten</p>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              Viele Spiele im App-Store sind kostenlos. Doch oft kann man im Spiel Dinge kaufen.
            </p>
            <p className={styles.text}>Diese nennt man In-App-Käufe.</p>
          </div>
          <div className={styles.illustration}>
            <span className={styles.illustrationPhone}>📱</span>
            <span className={styles.illustrationArrow}>➜</span>
            <span className={styles.illustrationCoin}>🪙</span>
            <span className={styles.illustrationShop}>Shop</span>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={goNextScreen}
          >
            Starten
          </button>
        </>
      )}

      {screen === 2 && (
        <>
          <h1 className={styles.title}>Kennst du das aus Spielen?</h1>
          <div className={styles.textBlock}>
            <ul className={styles.list}>
              <li>
                <span className={styles.listIcon}>🪙</span>
                <span>extra Münzen kaufen</span>
              </li>
              <li>
                <span className={styles.listIcon}>🎨</span>
                <span>neue Skins kaufen</span>
              </li>
              <li>
                <span className={styles.listIcon}>⚡</span>
                <span>schneller weiterkommen</span>
              </li>
              <li>
                <span className={styles.listIcon}>🎁</span>
                <span>eine Überraschungsbox öffnen</span>
              </li>
            </ul>
            <p className={styles.text}>
              Viele Spiele bieten solche Dinge an. Man kann sie mit echtem Geld kaufen.
            </p>
          </div>
          <p className={styles.question}>Hast du so etwas schon einmal gesehen?</p>
          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.choiceButton}
              onClick={goNextScreen}
            >
              Ja
            </button>
            <button
              type="button"
              className={styles.choiceButton}
              onClick={goNextScreen}
            >
              Nein
            </button>
            <button
              type="button"
              className={styles.choiceButton}
              onClick={goNextScreen}
            >
              Weiß ich nicht
            </button>
          </div>
        </>
      )}

      {screen === 3 && (
        <>
          <h1 className={styles.title}>Warum machen Spiele das?</h1>
          <div className={styles.textBlock}>
            <p className={styles.text}>
              Spielefirmen verdienen Geld mit diesen Käufen. Manchmal versuchen Spiele sogar,
              Spielerinnen und Spieler zum Kaufen zu bringen.
            </p>
            <p className={styles.text}>Zum Beispiel durch:</p>
            <ul className={styles.list}>
              <li>
                <span className={styles.listIcon}>⏱️</span>
                <span>Angebote „nur für kurze Zeit“</span>
              </li>
              <li>
                <span className={styles.listIcon}>⏰</span>
                <span>Countdown-Timer</span>
              </li>
              <li>
                <span className={styles.listIcon}>💤</span>
                <span>„Deine Energie ist leer“</span>
              </li>
            </ul>
            <p className={styles.text}>
              In diesem Modul lernst du, wie diese Tricks funktionieren.
            </p>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={goNextScreen}
          >
            Los geht&apos;s
          </button>
        </>
      )}

      {screen === 4 && (
        <>
          <h1 className={styles.title}>Deine Mission</h1>
          <div className={styles.textBlock}>
            <p className={styles.text}>Finde heraus:</p>
            <ul className={styles.list}>
              <li>
                <span className={styles.listIcon}>🧩</span>
                <span>Was In-App-Käufe sind</span>
              </li>
              <li>
                <span className={styles.listIcon}>🧠</span>
                <span>Wie Spiele dich zum Kaufen bringen</span>
              </li>
              <li>
                <span className={styles.listIcon}>🔍</span>
                <span>Wie du Kauf-Tricks erkennen kannst</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={goNextScreen}
          >
            Weiter zum Level
          </button>
        </>
      )}
    </div>
  )
}
