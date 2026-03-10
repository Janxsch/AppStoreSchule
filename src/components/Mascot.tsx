import { useEffect, useMemo, useState } from 'react'
import styles from './Mascot.module.css'

export type MascotMode = 'neutral' | 'info' | 'celebrate'

type MascotProps = {
  mode?: MascotMode
  /** einzelne Nachricht (Kompatibilitäts-Variante) */
  message?: string
  /** mehrere Nachrichten, durch Klick zyklisch durchschaltbar */
  messages?: string[]
  /** optional: wie lange die Sprechblase beim ersten Anzeigen offen bleibt (ms) */
  autoHideMs?: number
}

export default function Mascot({
  mode = 'neutral',
  message,
  messages,
  autoHideMs = 6000,
}: MascotProps) {
  const allMessages = useMemo(() => {
    if (Array.isArray(messages) && messages.length > 0) return messages
    return message ? [message] : []
  }, [message, messages])

  const [open, setOpen] = useState(allMessages.length > 0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    setOpen(allMessages.length > 0)
  }, [allMessages.length])

  useEffect(() => {
    if (!allMessages.length) return
    const id = window.setTimeout(() => setOpen(false), autoHideMs)
    return () => window.clearTimeout(id)
  }, [allMessages.length, autoHideMs])

  const currentMessage = allMessages[index] ?? ''

  const label =
    mode === 'celebrate'
      ? 'Gut gemacht!'
      : mode === 'info'
        ? 'Tipp'
        : 'Begleiter'

  const handleClick = () => {
    if (!allMessages.length) {
      setOpen((prev) => !prev)
      return
    }
    // Wenn zu, beim Klick wieder öffnen
    if (!open) {
      setOpen(true)
      return
    }
    // Sonst zur nächsten Nachricht springen
    setIndex((prev) => (prev + 1) % allMessages.length)
  }

  return (
    <aside
      className={styles.container}
      aria-label="Maskottchen und Hinweis"
      onClick={handleClick}
    >
      <div className={styles.avatarWrap}>
        <img
          src="/robot-mascot.png"
          alt="Maskottchen"
          className={styles.robotImg}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
            const next = (e.target as HTMLImageElement).nextElementSibling
            if (next) (next as HTMLElement).style.display = 'flex'
          }}
        />
        <div className={styles.robotPlaceholder} aria-hidden>
          🤖
        </div>
      </div>
      {open && currentMessage && (
        <div className={`${styles.speech} ${styles[mode]}`}>
          <p className={styles.label}>{label}</p>
          <p className={styles.message}>{currentMessage}</p>
        </div>
      )}
    </aside>
  )
}

