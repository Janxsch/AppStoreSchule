import { useParams, Navigate } from 'react-router-dom'
import { MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import type { ModuleId } from '../data/modules'
import InAppKaeufeModule from '../modules/in-app-kaeufe/InAppKaeufeModule'
import PlaceholderModule from '../modules/PlaceholderModule'
import Mascot from '../components/Mascot'
import styles from './ModulePage.module.css'

export default function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { isModuleUnlocked } = useProgress()

  if (!moduleId) return <Navigate to="/" replace />

  const id = moduleId as ModuleId
  const module = MODULES.find((m) => m.id === id)
  if (!module) return <Navigate to="/" replace />

  if (!isModuleUnlocked(id)) {
    return (
      <div className={styles.wrap}>
        <p>Dieses Modul ist noch gesperrt. Schließe zuerst das vorherige Modul ab.</p>
        <Mascot
          mode="info"
          messages={[
            'Dieses Modul ist noch gesperrt. Schließe zuerst das vorherige Modul ab.',
            'Die Module bauen aufeinander auf – so wird es Schritt für Schritt verständlicher.',
          ]}
        />
      </div>
    )
  }

  if (id === 'in-app-kaeufe') {
    return (
      <div className={styles.wrap}>
        <InAppKaeufeModule moduleId={id} title={module.title} badge={module.badge} />
        <Mascot
          mode="info"
          messages={[
            'Lies dir die Situationen in Ruhe durch und triff deine Entscheidungen – es gibt kein richtig oder falsch, sondern Erfahrungen.',
            'Achte darauf, wie oft du in der Simulation Geld ausgibst – das hilft dir bei der Auswertung.',
            'Beim Quiz kannst du zeigen, wie gut du die Kauf-Tricks erkannt hast.',
          ]}
        />
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <PlaceholderModule moduleId={id} title={module.title} badge={module.badge} />
      <Mascot
        mode="neutral"
        messages={[
          'Dieses Modul ist noch ein Platzhalter. Der Ablauf wird später dem In-App-Käufe-Modul ähneln.',
          'Konzentriere dich zuerst auf das In-App-Käufe-Modul – es zeigt dir den typischen Ablauf.',
        ]}
      />
    </div>
  )
}
