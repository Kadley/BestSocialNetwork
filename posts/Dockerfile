# Étape 1 : Image de base Node + pnpm
FROM node:22-alpine

# Installer pnpm
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances uniquement pour optimiser le cache
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances avec pnpm (prod + dev inclus)
RUN pnpm install

# Copier tout le reste du projet
COPY . .

# Exposer le port (Hono par défaut)
EXPOSE 3000

# Lancer l'application en dev
CMD ["pnpm", "dev"]
