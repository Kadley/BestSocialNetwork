# Debug

Le package `debug` est un outil très utiliser dans le monde Node.js.

Il répond à un besoin simple : afficher des messages de débuggage dans la console.

L'idée est de pouvoir activer ou désactiver ces messages de manière dynamique.

On va créer des "catégories" de log et choisir d'afficher ou non ces catégories.

## Utilisation

```ts
import debug from 'debug';

export const log = debug('app:log');
export const debugLog = debug('app:debug');
export const errorLog = debug('app:error');
export const warnLog = debug('app:warn');
export const infoLog = debug('app:info');

// Utilisation

log('Hello world');
debugLog('Hello world');
errorLog('Hello world');
warnLog('Hello world');
infoLog('Hello world');
```

Il faut ensuite ajouter une variable d'environnement pour activer les logs.

- `.env`
- Variable d'environnement avant la commande node
  - `DEBUG=app:* tsx src/index.ts`
- avec les [variables d'environnement de docker](./../compose.yml)

La variable d'environnement est `DEBUG`.

Les valeurs possibles sont :

- `app:*` : tous les logs de l'application
- `app:log` : les logs de la catégorie `log`
- `*` : tous les logs de toutes les catégories (même celles de dépendances)

## Astuce

Si je souhaite filtrer les logs de mon application, je peux utiliser la commande suivante :

```bash
# -f : pour suivre les logs en temps réel
# --tail=100 : pour afficher les 100 dernières lignes de logs
# grep : pour filtrer les logs
docker compose logs -f --tail=100 | grep "app:log"
```
