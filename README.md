# Portfolio de Youssouf Diaffara Diallo

Portfolio personnel développé avec React, TypeScript, Vite et Tailwind CSS.

## Développement local

```sh
npm ci
npm run dev
```

## Vérifier la version de production

```sh
npm run build
npm run preview
```

## Hébergement gratuit

Le dépôt est configuré pour publier automatiquement le site sur GitHub Pages à chaque push sur `main`, via GitHub Actions. Le workflow construit le site avec le chemin Vite correspondant au dépôt, puis le déploie.

Adresse du site : <https://diaffara6.github.io/myportfolio/>

Si GitHub Pages n'est pas encore activé pour le dépôt, aller dans **Settings → Pages** et choisir **GitHub Actions** comme source de déploiement.

Pour modifier le contenu ou les coordonnées, éditer `src/data.ts`.
