# Suivi Individuel Jules V

Une plateforme de suivi vidéo sécurisée avec authentification, gestion des rôles et base de données PostgreSQL.

## 🚀 Fonctionnalités

- ✅ **Authentification sécurisée** avec JWT et bcrypt
- ✅ **Gestion des rôles** : Admin, Staff, Joueur
- ✅ **Mots de passe protégés** avec hashage bcrypt
- ✅ **Base de données PostgreSQL**
- ✅ **API REST sécurisée**
- ✅ **Pages de login/signup**
- ✅ **Dashboard utilisateur**
- ✅ **Admin panel**
- ✅ **Prêt pour Vercel**

## 🛠️ Stack Technique

- **Framework**: Next.js 14+
- **Langage**: TypeScript
- **Base de données**: PostgreSQL (via Prisma ORM)
- **Authentification**: JWT + bcrypt
- **Déploiement**: Vercel

## 📋 Installation

### 1. Cloner le repo
```bash
git clone https://github.com/Julesvillamaux60/suivi-individueljulesv.git
cd suivi-individueljulesv
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer la base de données

#### Option A: Neon (PostgreSQL gratuit - RECOMMANDÉ)
1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer une nouvelle base de données
3. Copier la connection string

#### Option B: Supabase (PostgreSQL gratuit)
1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Copier la connection string dans Settings > Database

### 4. Créer le fichier `.env.local`
```bash
cp .env.example .env.local
```

Puis éditer `.env.local` :
```
DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="votre-clé-secrète-très-longue-et-aléatoire"
```

### 5. Initialiser la base de données
```bash
npx prisma db push
```

### 6. Démarrer le serveur de développement
```bash
npm run dev
```

L'app est disponible sur `http://localhost:3000`

## 📱 Pages

- **`/`** - Accueil
- **`/signup`** - Créer un compte
- **`/login`** - Se connecter
- **`/dashboard`** - Tableau de bord (protégé)
- **`/admin/users`** - Gestion des utilisateurs (admin seulement)

## 🔐 Sécurité

### Authentification
- Mots de passe hashés avec **bcrypt** (10 rounds)
- Tokens JWT avec expiration 7 jours
- Cookies **HttpOnly** et **SameSite=Strict**
- Sessions stockées en base de données

### Protection des routes
- Middleware d'authentification
- Vérification des rôles côté serveur
- Validation des données

## 🚢 Déploiement sur Vercel

### 1. Pousser le code sur GitHub
```bash
git add .
git commit -m "Initial commit: Add auth system"
git push origin main
```

### 2. Connecter Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "Import Project"
3. Sélectionner le repo GitHub
4. Cliquer "Import"

### 3. Configurer les variables d'environnement
Dans Vercel Dashboard > Settings > Environment Variables :
- Ajouter `DATABASE_URL` (PostgreSQL connection string)
- Ajouter `JWT_SECRET` (clé secrète)

### 4. Déployer
Vercel va automatiquement :
1. Installer les dépendances
2. Compiler le code
3. Déployer l'app

### ✅ C'est prêt !
Ton app est maintenant disponible sur `https://suivi-individueljulesv.vercel.app`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/signup` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter

### Utilisateur
- `GET /api/user/me` - Récupérer le profil (protégé)

### Admin
- `GET /api/admin/users` - Lister tous les utilisateurs (admin seulement)
- `PATCH /api/admin/users` - Modifier le rôle d'un utilisateur (admin seulement)

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésite pas à créer une issue ou une pull request.

## 📄 License

MIT

---

**Créé avec ❤️ par Jules**
