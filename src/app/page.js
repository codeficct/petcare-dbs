import Login from '@/components/Login'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>PetCare</h1>
      <Login />
    </main>
  )
}
