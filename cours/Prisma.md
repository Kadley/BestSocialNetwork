# Prisma

C'est un ORM pour Node.js.

## Installation

```bash
# On installe la dépendance Prisma
pnpm install prisma --save-dev

# On installe Prisma
npx prisma init --output ../generated/prisma
```

Cela créer un dossier `prisma` avec dedans un fichier `schema.prisma` et un fichier `.env`.

## Utilisation

On défini notre schema dans le fichier `schema.prisma` (voir [le fichier](./../../user/prisma/schema.prisma))

Une fois défini, on va générer le fichier de migration et le client Prisma.

```bash
# On génère le client Prisma
npx prisma migrate dev
```

SI on utilise docker, les commandes sont à faire depuis l'intérieur du container :

```bash
# On génère la migration
docker compose exec <container_name> npx prisma migrate dev
docker compose exec user npx prisma migrate dev

# Si uniquement besoin de généré le client
docker compose exec <container_name> npx prisma generate
docker compose exec user npx prisma generate
```
