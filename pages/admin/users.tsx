'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Admin.module.css';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
      } else {
        setError('Erreur lors de la mise à jour');
      }
    } catch (err) {
      setError('Erreur serveur');
      console.error(err);
    }
  };

  if (loading) return <div className={styles.container}><p>Chargement...</p></div>;

  return (
    <div className={styles.container}>
      <h1>Gestion des utilisateurs</h1>
      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Créé le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="STAFF">Staff</option>
                  <option value="JOUEUR">Joueur</option>
                </select>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
              <td>
                <button className={styles.btn}>Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
