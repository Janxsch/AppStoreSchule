import { Link } from 'react-router-dom'
import { useProgress } from '../store/ProgressContext'
import type { ModuleId } from '../data/modules'
import styles from './ModuleCard.module.css'

type Props = {
  id: ModuleId
  title: string
  index: number
}

export default function ModuleCard({ id, title, index }: Props) {
  const { isModuleCompleted, isModuleUnlocked } = useProgress()
  const completed = isModuleCompleted(id)
  const locked = !isModuleUnlocked(id)

  const handleClick = (e: React.MouseEvent) => {
    if (locked) {
      e.preventDefault()
      return
    }
  }

  const themeClasses = [
    styles.theme1,
    styles.theme2,
    styles.theme3,
    styles.theme4,
  ]
  const themeClass = themeClasses[index % themeClasses.length]

  const content = (
    <>
      <span className={styles.number}>{index + 1}</span>
      <span className={styles.title}>{title}</span>
      {completed && <span className={styles.badge}>✓</span>}
      {locked && <span className={styles.locked}>🔒</span>}
    </>
  )

  if (locked) {
    return (
      <div className={`${styles.card} ${themeClass} ${styles.lockedCard}`} aria-disabled>
        {content}
      </div>
    )
  }

  return (
    <Link
      to={`/module/${id}`}
      className={`${styles.card} ${themeClass} ${completed ? styles.completed : ''}`}
      onClick={handleClick}
    >
      {content}
    </Link>
  )
}
