# Docker

## Dockerfile

Dockerfile => liste d'instructions pour construire une image

### Exemple de Dockerfile avec pnpm et node

```dockerfile
# On démarre avec une image de base, ici node:22
FROM node:22-alpine

# On crée un répertoire de travail
WORKDIR /app

# On va installer pnpm
RUN npm install -g pnpm

# On copie le package.json et le pnpm-lock.json
# Cela permet de ne pas réinstaller les dépendances à chaque fois qu'on modifie le code
# C'est mis en cache
COPY package.json pnpm-lock.yaml ./

# On installe les dépendances
RUN pnpm install

# On copie le reste du code
COPY . .

# On expose le port 3000
EXPOSE 3000

# On démarre l'application
CMD ["pnpm", "start"]
```

### Commandes Docker

```bash
# On construit l'image Docker du dossier courant
# -t : tag, on peut mettre un nom à l'image
docker build -t mon-image .

# On lance un conteneur à partir de l'image
# -d : détaché, on ne voit pas le conteneur dans le terminal
docker run -d mon-image
```

## Docker Compose

Docker Compose => outil pour définir et exécuter des applications multi-conteneurs.

C'est une sorte d'orchestrateur de conteneurs.

On va créer un fichier se nommant `compose.yml` à la racine de notre projet.

```yaml
# On va définir nos services
# En gros, les différentes parties de notre application
services:
  # On définit un service
  main:
    # On indique l'image à utiliser
    build:
      # le contexte permet de définir le répertoire (dossier) de travail
      context: ./main
      # On peut aussi définir le Dockerfile à utiliser
      dockerfile: Dockerfile
    ports:
      # On expose le port 3000 de l'hôte vers le port 3000 du conteneur
      # 'hote:conteneur'
      - '3000:3000'
    # Je vais partager un volume entre mon hôte et le conteneur
    # volumes : permet de partager des fichiers entre l'hôte et le conteneur
    volumes:
      # On va partager le dossier ./main avec le conteneur
      # !!!! On fait ça uniquement en développement !!!!
      - ./main:/app
      # Je vais ignorer le partage du dossier node_modules
      # A chaque ajoute de dépendance, je vais devoir relancer le build
      # Certaines dépendances sont compilées et spécifiques à une architecture (ex: macOS, Linux, Windows)
      - /app/node_modules
    # On va spécifier la commande à exécuter
    command: pnpm dev
```

### Commandes Docker Compose

```bash
# On va lancer le conteneur
docker compose up

# On va lancer le conteneur en détaché
docker compose up -d

# Afficher les logs
docker compose logs

# Afficher les logs en temps réel
docker compose logs -f

# On va arrêter le conteneur
docker compose down

# On peut exécuter chaque service individuellement
docker compose logs <nom_du_service> -f

# On peut exécuter une commande dans le conteneur
docker compose exec <nom_du_service> <commande>

# Si je veux entrer dans le conteneur
docker compose exec <nom_du_service> sh
```

### Astuce

Si le dossier `node_modules` n'est pas partagé, lorsque l'on installe une dépendance, il va falloir l'installer dans le container également.
On peut le faire en exécutant la commande suivante :

```bash
docker compose exec <nom_du_service> pnpm install
```
