// @ts-expect-error - ts not setup for css imports yet
import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div
      className={styles.pokeball}
      aria-label="Loading..."
      aria-busy="true"
      aria-live="polite"
    />
  )
}
