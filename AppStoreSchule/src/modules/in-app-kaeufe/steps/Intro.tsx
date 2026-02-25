import styles from './Step.module.css'

type Props = { title: string; onNext: () => void }

export default function Intro({ onNext }: Props) {
  return (
    <div className={styles.step}>
      <h1 className={styles.title}>Kostenlos – aber wirklich?</h1>
      <p className={styles.text}>
        Ein Spiel wird kostenlos heruntergeladen. Nach wenigen Sekunden erscheint ein Kaufangebot.
      </p>
      <p className={styles.text}>
        Viele Spiele kosten beim Download nichts. Geld verdienen sie später – durch Käufe im Spiel.
      </p>
      <button type="button" className={styles.button} onClick={onNext}>
        Weiter
      </button>
    </div>
  )
}
