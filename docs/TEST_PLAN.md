# Plan de tests

## Objectif
Valider les fonctionnalités essentielles de l’application Todo & Login, prévenir les régressions et garantir une expérience utilisateur fluide.

## Portée
- Création, bascule et suppression de tâches
- Messages d’erreur pour saisies invalides
- Authentification (succès/échec)
- Compatibilité de base (Chromium, Firefox, WebKit)

## Stratégie
- **Tests fonctionnels UI** (Playwright)
- **Non-régression** via une suite stable exécutée en CI
- **Exploratoires** à chaque évolution avec checklist
- **Traçabilité** : chaque cas de test mappe à une exigence

## Cas de test principaux
- CT-001: Affichage de la page d’accueil et liste initiale
- CT-002: Ajout d’une tâche valide
- CT-003: Rejet d’une tâche invalide (< 3 caractères)
- CT-004: Basculer l’état d’une tâche
- CT-005: Supprimer une tâche et vérifier l’intégrité des autres (NR)
- CT-006: Connexion réussie
- CT-007: Connexion invalide

## Données de test
- Compte: qa@demo.com / radia123
- Tâche invalide: "ok"
- Tâche valide: "Écrire un test de non-régression"

## Critères d’acceptation
- 100% des cas de test critiques passent
- 0 bug Bloquant/Critique ouvert
