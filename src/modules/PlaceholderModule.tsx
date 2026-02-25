import { Link, useNavigate } from 'react-router-dom'
import { useProgress } from '../store/ProgressContext'
import type { ModuleId } from '../data/modules'
import styles from './PlaceholderModule.module.css'

type Props = { moduleId: ModuleId; title: string; badge: string }

export default function PlaceholderModule({ moduleId, title, badge }: Props) {
  const navigate = useNavigate()
  const { completeModule } = useProgress()

  const handleComplete = () => {
    completeModule(moduleId)
    navigate('/')
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>Inhalt für dieses Modul folgt.</p>
      <p className={styles.badgeName}>Badge: {badge}</p>
      <button type="button" className={styles.complete} onClick={handleComplete}>
        Modul als abgeschlossen markieren (zum Freischalten des nächsten)
      </button>
      <Link to="/" className={styles.back}>
        Zurück zum Start
      </Link>
    </div>
  )
}
