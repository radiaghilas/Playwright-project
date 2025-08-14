# QA Playwright – Démo par Radia Ghilas

Petit projet *portfolio-ready* :
- **Playwright** (tests fonctionnels, non-régression, login, todo)
- **Plan de tests**, **stratégie**, **checklist release**
- **CI GitHub Actions** (exécution des tests sur Chromium/Firefox/WebKit)

## Lancer localement

```bash
npm i
npx playwright install
npm test      # lance les tests en mode headless
npm run test:ui  # lance les tests en mode interactif
npm start     # démarre le serveur sur http://localhost:3000
```

> Accès de test : `qa@demo.com` / `radia123`

## Ce que ce repo démontre

- Rédaction de **plans de tests** et **scénarios** (dossier `docs/`)
- **Tests de non-régression** (voir `tests/non-regression.spec.ts`)
- **Tests exploratoires** et liste de checks UI de base
- **Suivi des anomalies** avec un modèle de ticket (`docs/DEFECT_TEMPLATE.md`)
- **CI** qui exécute la suite Playwright sur chaque push

## Périmètre des tests

- **UI** : ajout/suppression/bascule des todos, messages d’erreur, login
- **API** : validation basique via interactions UI (les endpoints sont dans `server.js`)

## Feature flags & régressions
Une variable `FEATURE_FLAG_PERSIST_TODOS` est prévue dans `server.js` pour simuler une évolution produit et bâtir des **tests de non-régression** autour de la persistance.

## Structure
```
.
├── docs/
│   ├── TEST_PLAN.md
│   ├── TEST_STRATEGY.md
│   ├── CHECKLIST_RELEASE.md
│   └── DEFECT_TEMPLATE.md
├── public/
├── tests/
├── .github/workflows/ci.yml
├── server.js
├── package.json
└── playwright.config.ts
```

## Idées d'extensions
- Ajouter des **tests API** dédiés (supertest) et des **tests de charge** (k6)
- Couvrir l’accessibilité (axe-playwright)
- Ajouter ESLint/Prettier et des tests visuels par snapshot
- Dockeriser l’app et les tests
```
