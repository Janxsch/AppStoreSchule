import { useState } from 'react'
import type { ModuleId } from '../../../data/modules'
import Situation1 from './Situation1'
import Situation2 from './Situation2'
import Situation3 from './Situation3'

type Props = { moduleId: ModuleId; onNext: () => void }

export default function Simulation({ moduleId, onNext }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1)

  if (phase === 1) {
    return <Situation1 moduleId={moduleId} onNext={() => setPhase(2)} />
  }
  if (phase === 2) {
    return <Situation2 moduleId={moduleId} onNext={() => setPhase(3)} />
  }
  return <Situation3 moduleId={moduleId} onNext={onNext} />
}
