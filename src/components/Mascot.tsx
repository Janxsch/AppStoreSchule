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
    if (!allMessages.length || !open) return
    const id = window.setTimeout(() => setOpen(false), autoHideMs)
    return () => window.clearTimeout(id)
  }, [allMessages.length, autoHideMs, open, index])

  const currentMessage = allMessages[index] ?? ''

  const label =
    mode === 'celebrate'
      ? 'Gut gemacht!'
      : mode === 'info'
        ? 'Tipp'
        : 'Begleiter'

  const ariaLabel =
    mode === 'celebrate'
      ? 'Maskottchen gratuliert dir'
      : mode === 'info'
        ? 'Maskottchen gibt dir einen Tipp'
        : 'Maskottchen begleitet dich durch die Aufgabe'

  const handleClick = () => {
    if (!allMessages.length) {
      setOpen((prev) => !prev)
      return
    }
    // Wenn offen: komplett schließen
    if (open) {
      setOpen(false)
      return
    }
    // Wenn zu: erste Nachricht wieder öffnen
    setIndex(0)
    setOpen(true)
  }

  // Wenn geschlossen oder keine Nachricht: gar nichts anzeigen
  if (!open || !currentMessage) {
    return null
  }

  return (
    <aside
      className={`${styles.container} ${styles[mode]}`}
      aria-label={ariaLabel}
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
      <div className={`${styles.speech} ${styles[mode]}`}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Hinweis schließen"
          onClick={(e) => {
            e.stopPropagation()
            setOpen(false)
          }}
        >
          ×
        </button>
        <p className={styles.label}>{label}</p>
        <p className={styles.message}>{currentMessage}</p>
      </div>
    </aside>
  )
}

