import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>Personalized Learning Powered by AI</h1>
        <p>
          An adaptive learning platform that tailors educational content to your 
          unique learning style, pace, and preferences.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/login" className={styles.btnPrimary}>
            Get Started
          </Link>
          <Link href="/register" className={styles.btnSecondary}>
            Create Account
          </Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <Image 
          src="/image.png" 
          alt="Learning illustration" 
          width={600} 
          height={400} 
          priority
        />
      </div>
    </div>
  )
}