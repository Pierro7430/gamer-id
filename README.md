# GamerId

GamerId est un projet de gestion de comptes de jeux vidéo et de profils de joueurs en général. Cette application permet aux utilisateurs de centraliser leurs comptes de différentes plateformes de jeux vidéo et de gérer leur profil de joueur de manière unifiée.


## Technologies utilisées

- Frontend : React
- Backend : LoopBack 4
- Base de données : PostgreSQL


## Prérequis

- Node.js v14.x.x ou supérieur
- npm v6.x.x ou supérieur
- PostgreSQL v12.x.x ou supérieur


## Installation

1. Clonez le dépôt GitHub :
```
git clone https://github.com/Pierro7430/gamer-id.git
```

2. Installez les dépendances du back :
```
cd gi-backend
npm install
```

3. Configurez la base de données :

- Créez une nouvelle base de données PostgreSQL.
- Configurez le fichier src/datasources/db.datasource.ts avec les informations de votre base de données (hôte, nom d'utilisateur, mot de passe, nom de la base de données).
- Configurer le fichier .env à la racine de gi-backend
- Créez les tables dans la base de donnée :
```
npm run migrate
```

4. Démarrer le backend :
```
npm start
```

5. Installez les dépendances du front :
```
cd ../
cd gi-frontend
npm install
```

4. Démarrer le frontend :
```
npm start
```


L'application est maintenant accessible à l'adresse http://localhost:3000/


## Fonctionnalités

- Inscription et connexion des utilisateurs
- Ajout, modification et suppression des comptes de jeux vidéo
- Gestion des profils de joueurs
- Recherche et ajout d'amis
- Partage de statistiques et de succès de jeux

## Update & Debug

Après avoir pull il peut être nécessaire d'effectuer un npm install en front et en back
```
cd gi-backend
npm i
cd ../
cd gi-frontend
npm i
```

## Licence

Ce projet est sous licence MIT.


## Gestion de Git

### Les branches

#### Catégories :
- feat (ajout de feature)
- fix (correction de bug)
- hotfix (correction primordiale)
- wip (travail en cours pas fini pour test)
- chore (tout le reste)

#### Convention de nommage :
- Pas de majuscule
- Utilisez "/" au lieu de ":"
- Mettez un verbe en premier
- Allez à l'essentiel
- Utilisez des "-" au lieu d'espaces

#### Exemple :
feat/add-animation-to-the-header


### Les commits

#### Catégories :
- feat (ajout de feature)
- fix (correction de bug)
- hotfix (correction primordiale)
- wip (travail en cours pas fini pour test)
- chore (tout le reste)

#### Convention de nommage :
- Pas de majuscule
- Utilisez ":" suivi d'un espace au lieu de "/"
- Mettez un verbe en premier
- Allez à l'essentiel en détaillant un peu plus que le nom de la branche

#### Exemple :
feat: add new animation to header on page load


### Source

[DEV Community - A Simplified Convention for Naming Branches and Commits in Git](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4)
