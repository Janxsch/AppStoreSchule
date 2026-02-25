import { useParams, Navigate } from 'react-router-dom'
import { MODULES } from '../data/modules'
import { useProgress } from '../store/ProgressContext'
import type { ModuleId } from '../data/modules'
import InAppKaeufeModule from '../modules/in-app-kaeufe/InAppKaeufeModule'
import PlaceholderModule from '../modules/PlaceholderModule'
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
      </div>
    )
  }

  if (id === 'in-app-kaeufe') {
    return <InAppKaeufeModule moduleId={id} title={module.title} badge={module.badge} />
  }

  return <PlaceholderModule moduleId={id} title={module.title} badge={module.badge} />
}
