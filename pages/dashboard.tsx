'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Dashboard.module.css';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError('Erreur lors du chargement du profil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) return <div className={styles.container}><p>Chargement...</p></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tableau de bord</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Déconnexion
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {user && (
        <div className={styles.card}>
          <h2>Bienvenue, {user.username}!</h2>
          <div className={styles.userInfo}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rôle:</strong> <span className={styles.role}>{user.role}</span></p>
          </div>

          {user.role === 'ADMIN' && (
            <div className={styles.adminSection}>
              <h3>Admin Panel</h3>
              <Link href="/admin/users" className={styles.link}>
                Gérer les utilisateurs
              </Link>
            </div>
          )}

          {user.role === 'STAFF' && (
            <div className={styles.staffSection}>
              <h3>Staff Panel</h3>
              <p>Fonctionnalités staff à venir...</p>
            </div>
          )}

          {user.role === 'JOUEUR' && (
            <div className={styles.joueurSection}>
              <h3>Espace Joueur</h3>
              <p>Contenu du joueur à venir...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
