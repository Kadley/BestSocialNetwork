# Challenge

## Jour 2

En s'aidant du microservice des utilisateurs, créer le microservice des posts.

### Étape 1 : Installation du microservice

- Créer un nouveau projet `hono` (`pnpm create hono@latest`)
- Créer le Dockerfile + ajouter le service dans le docker compose
- Exposé le service sur le port 3002 et tester la route `http://localhost:3002` pour vérifier que le service est bien lancé.

### Étape 2 : Ajout de routes

- Ajouter dans un dossier `controllers` le fichier `post.controller.ts`
- Instancier un objet `Hono` et ajouter les routes pour récupérer tous les posts et un post par son id.
- Renvoyer des données factices pour tester le bon fonctionnement de l'API.
- Ajouter les routes au router du fichier `index.ts`.

### Étape 3 : Ajout de la BDD & Prisma

- Ajouter un service Postgres dans le docker compose (voir le fichier `docker-compose.yml` du microservice utilisateur).
- Installer Prisma dans le projet (`pnpm install prisma --save-dev`)
- Initialiser Prisma (`npx prisma init --output ../generated/prisma`)
- Configurer le fichier `.env` pour se connecter à la base de données (voir le fichier `.env` du microservice utilisateur).
- Créer le model `Post` dans le fichier `schema.prisma` (s'inspirer du fichier `schema.prisma` du microservice utilisateur).
- Créer la migration (`docker compose exec <mon_service> npx prisma migrate dev`)
- Initialiser le client Prisma (voir le fichier `utils/prisma.ts` du micro service utilisateur).
- Dans les routes d'API, remplacer les données factices par des données récupérées dans la base de données.
- N'hésitez pas à ajouter des données dans la base de données pour tester le bon fonctionnement de l'API.

## Jour 1

Best social network doit devenir le leader dans le domaine.

On va reprendre la même base que tous les concurrents.

Ce qui nous différenciera reste secret !

Dans ce cahier des charges fonctionnel, nous recherchons une entreprise capable de créer l’architecture de l’application.

Elle devra être extrêmement robuste et scallable.

On vise le lancement le plus rapide de l’histoire avec 15 milliards de comptes en 1 mois 💪

### Besoins fonctionnels

- Des utilisateurs
- Des posts
- Un feed
- Des abonnements à d'autres utilisateurs
- Des admins

Le feed sera une fonctionnalité novatrice, pour ne rien divulguer on voudrait dans un premier temps un feed simple :

- Pour chaque utilisateur de la plateforme, récupérer les 5 derniers posts.

### Besoins techniques

On sait que nos concurrents utilisent une architecture micro-service et ça fonctionne très bien.

Une fois qu'on aura percé, on aura une équipe de dev sur chaque µservice. D'après nos espions industriels, on aura ces µservices :

- Utilisateurs
- Post
- Autorisation
- Proxy

### Conception

A partir de l'appel d'offre du client, fournir les documents suivants :

- les user stories
- les use cases
- le MCD
- le diagramme de séquence pour l'affichage de son feed
- le diagramme d'activité pour la création d'un compte puis affichage d'un feed random
- (bonus) le diagramme de deploiement
