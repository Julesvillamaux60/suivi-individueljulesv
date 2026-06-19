import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Bienvenue sur Suivi Individuel</h1>
        <p>Plateforme de suivi vidéo sécurisée</p>
        
        <div className={styles.buttons}>
          <Link href="/login" className={styles.button}>
            Se connecter
          </Link>
          <Link href="/signup" className={styles.button + ' ' + styles.secondary}>
            Créer un compte
          </Link>
        </div>

        <div className={styles.features}>
          <h2>Fonctionnalités</h2>
          <ul>
            <li>✅ Authentification sécurisée</li>
            <li>✅ Gestion des rôles (Admin, Staff, Joueur)</li>
            <li>✅ Mots de passe protégés</li>
            <li>✅ Base de données sécurisée</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
