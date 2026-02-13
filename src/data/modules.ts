export const MODULE_IDS = [
  'in-app-kaeufe',
  'werbung-in-apps',
  'influencer-online-stars',
  'datenschutz',
  'abofallen',
  'app-bewertungen-rankings',
  'bildschirmzeit-gesunde-nutzung',
] as const

export type ModuleId = (typeof MODULE_IDS)[number]

export const MODULES: { id: ModuleId; title: string; badge: string }[] = [
  { id: 'in-app-kaeufe', title: 'In App Käufe', badge: 'In-App-Checker' },
  { id: 'werbung-in-apps', title: 'Werbung in Apps', badge: 'Werbung-Durchschaut' },
  { id: 'influencer-online-stars', title: 'Influencer und Online Stars', badge: 'Star-Checker' },
  { id: 'datenschutz', title: 'Datenschutz', badge: 'Datenschutz-Profi' },
  { id: 'abofallen', title: 'Abofallen', badge: 'Abo-Checker' },
  { id: 'app-bewertungen-rankings', title: 'App Bewertungen und Rankings', badge: 'Bewertungs-Profi' },
  { id: 'bildschirmzeit-gesunde-nutzung', title: 'Bildschirmzeit und gesunde App Nutzung', badge: 'Balance-Profi' },
]

export const RANKS = ['Anfänger', 'App-Checker', 'App-Profi'] as const
export type Rank = (typeof RANKS)[number]

/** Rang nach Anzahl abgeschlossener Module: 0 = Anfänger, 1-3 = App-Checker, 4-7 = App-Profi */
export function getRankFromCompleted(completed: number): Rank {
  if (completed === 0) return 'Anfänger'
  if (completed < 4) return 'App-Checker'
  return 'App-Profi'
}

export const TOTAL_MODULES = MODULE_IDS.length
