import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MODULE_IDS, getRankFromCompleted, type ModuleId, type Rank } from '../data/modules'

const STORAGE_KEY = 'appstore-schule-progress'

export type ReflectionAnswer = {
  moduleId: ModuleId
  question: string
  answer: string
  timestamp: number
}

export type SimulationChoice = {
  moduleId: ModuleId
  situationId: string
  choice: string
  amountSpent?: number
  timestamp: number
}

type ProgressState = {
  completedModuleIds: ModuleId[]
  reflectionAnswers: ReflectionAnswer[]
  simulationChoices: SimulationChoice[]
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as ProgressState
    return {
      completedModuleIds: Array.isArray(parsed.completedModuleIds) ? parsed.completedModuleIds : [],
      reflectionAnswers: Array.isArray(parsed.reflectionAnswers) ? parsed.reflectionAnswers : [],
      simulationChoices: Array.isArray(parsed.simulationChoices) ? parsed.simulationChoices : [],
    }
  } catch {
    return defaultProgress()
  }
}

function defaultProgress(): ProgressState {
  return {
    completedModuleIds: [],
    reflectionAnswers: [],
    simulationChoices: [],
  }
}

type ProgressContextValue = {
  completedModuleIds: ModuleId[]
  completedCount: number
  rank: Rank
  isModuleCompleted: (id: ModuleId) => boolean
  isModuleUnlocked: (id: ModuleId) => boolean
  completeModule: (id: ModuleId) => void
  reflectionAnswers: ReflectionAnswer[]
  addReflectionAnswer: (moduleId: ModuleId, question: string, answer: string) => void
  simulationChoices: SimulationChoice[]
  addSimulationChoice: (moduleId: ModuleId, situationId: string, choice: string, amountSpent?: number) => void
  getSimulationSpentForModule: (moduleId: ModuleId) => number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const completedCount = state.completedModuleIds.length
  const rank = getRankFromCompleted(completedCount)

  const isModuleCompleted = useCallback(
    (id: ModuleId) => state.completedModuleIds.includes(id),
    [state.completedModuleIds]
  )

  const isModuleUnlocked = useCallback(
    (id: ModuleId) => {
      const index = MODULE_IDS.indexOf(id)
      if (index <= 0) return true
      const prevId = MODULE_IDS[index - 1]
      return state.completedModuleIds.includes(prevId)
    },
    [state.completedModuleIds]
  )

  const completeModule = useCallback((id: ModuleId) => {
    setState((s) =>
      s.completedModuleIds.includes(id)
        ? s
        : { ...s, completedModuleIds: [...s.completedModuleIds, id] }
    )
  }, [])

  const addReflectionAnswer = useCallback((moduleId: ModuleId, question: string, answer: string) => {
    setState((s) => ({
      ...s,
      reflectionAnswers: [
        ...s.reflectionAnswers,
        { moduleId, question, answer, timestamp: Date.now() },
      ],
    }))
  }, [])

  const addSimulationChoice = useCallback(
    (moduleId: ModuleId, situationId: string, choice: string, amountSpent?: number) => {
      setState((s) => ({
        ...s,
        simulationChoices: [
          ...s.simulationChoices,
          { moduleId, situationId, choice, amountSpent, timestamp: Date.now() },
        ],
      }))
    },
    []
  )

  const getSimulationSpentForModule = useCallback(
    (moduleId: ModuleId) => {
      return state.simulationChoices
        .filter((c) => c.moduleId === moduleId && c.amountSpent != null)
        .reduce((sum, c) => sum + (c.amountSpent ?? 0), 0)
    },
    [state.simulationChoices]
  )

  const value = useMemo<ProgressContextValue>(
    () => ({
      completedModuleIds: state.completedModuleIds,
      completedCount,
      rank,
      isModuleCompleted,
      isModuleUnlocked,
      completeModule,
      reflectionAnswers: state.reflectionAnswers,
      addReflectionAnswer,
      simulationChoices: state.simulationChoices,
      addSimulationChoice,
      getSimulationSpentForModule,
    }),
    [
      state.completedModuleIds,
      state.reflectionAnswers,
      state.simulationChoices,
      completedCount,
      rank,
      isModuleCompleted,
      isModuleUnlocked,
      completeModule,
      addReflectionAnswer,
      addSimulationChoice,
      getSimulationSpentForModule,
    ]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
