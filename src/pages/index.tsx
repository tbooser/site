import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tim Booser</h1>
        <Link href="/discogs/collection">
          <a>Discogs Collection</a>
        </Link>
        <Link href="/discogs/wantlist">
          <a>Discogs Wantlist</a>
        </Link>
        <Link href="https://www.linkedin.com/in/timothy-booser/">
          <a rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
        </Link>
        <Link href="https://github.com/tbooser">
          <a rel="noopener noreferrer" target="_blank">
            Github
          </a>
        </Link>
      </main>
    </div>
  )
}

export default Home
