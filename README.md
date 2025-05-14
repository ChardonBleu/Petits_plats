# ![Les petits plats](assets/icons/logo.png)

## Les petits plats

Ce dépôt correspond au Projet 7 de la formation Javascript React d'Openclassrooms.

Il s'agit d'un site de recueil de recettes avec fonctionalité de recherche.

- La branche PP_search1 contient l'algorithme de recherche avec les boucles natives (while, for, ...).
- La branche PP_search2 contient l'algorithme de recherche utilisant la programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce, ...).
- La brance principale main contient la méthode de recherche la plus performante parmis ces deux branches, en utilisant [JSBench](https://jsben.ch/) pour les comparer.

## Exécution en local

Cloner le dépôt dans le dossier de votre choix:

```bash
git clone https://github.com/ChardonBleu/Petits_plats
```

puis activer le live serveur (VS Code).  
La page index.html devrait s'ouvir dans votre navigateur par défaut sur l'adresse:

```bash
127.0.0.1:5500
```

Eventuellement installer les dépendances( linter et prettier):

```bash
npm install
```

Pour lancer le projet avec TailwindCSS:

```bash
npm run dev
```

Pour excuter eslint:

```bash
npm run lint
```

Pour excuter prettier:

```bash
npm run fmt
```

Pour fixer les erreurs du prettier:

```bash
npm run fmt:fix
```

## Hébergement GitHub

[chardonbleu.github.io/Petits_plats/](https://chardonbleu.github.io/Petits_plats/)

## Sources utilisées:

Ressources:

- Cours [Découvrez le fonctionnement des algorithmes](https://openclassrooms.com/fr/courses/7527306-decouvrez-le-fonctionnement-des-algorithmes).

- Cours [Appliquez les principes du Green IT dans votre entreprise](https://openclassrooms.com/fr/courses/6227476-appliquez-les-principes-du-green-it-dans-votre-entreprise).

- Documentation [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite).

- Article [Comprendre les algorithmes de tri ](https://www.jesuisundev.com/comprendre-les-algorithmes-de-tri-en-7-minutes/)

- Article [Les algorithmes de tri](https://interstices.info/les-algorithmes-de-tri/)

## Remerciements

Un très grand merci à Herbert Caffarel pour ses précieux conseils et retours.
