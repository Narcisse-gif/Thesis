# Thesis

Plateforme full-stack avec un frontend React (Vite) et un backend NestJS.

## Stack

- Frontend: React + Vite + Tailwind
- Backend: NestJS + TypeORM + PostgreSQL

## Structure

- frontend/: application React (Vite)
- backend/: API NestJS
- uploads/: fichiers uploades (avatars, logos, etc.)

## Prerequis

- Node.js 18+ recommande
- npm 9+
- PostgreSQL

## Installation

A la racine :

```bash
npm install
```

Puis dans chaque app :

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Configuration

### Backend (.env)

Cree ou complete backend/.env. Variables utilisees par le code :

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_NAME=stagelink
PORT=8081
JWT_SECRET=change-me
ADMIN_EMAIL=admin@stagelink.bf
ADMIN_PASSWORD=change-me
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
EMAILJS_USER_ID=...
EMAILJS_PRIVATE_KEY=...
```

Notes:

- Le mot de passe DB est actuellement fixe en dur dans [backend/src/app.module.ts](backend/src/app.module.ts). Si besoin, remplace-le par une variable d env.
- Le secret JWT est lu dans [backend/src/auth/strategies/jwt.strategy.ts](backend/src/auth/strategies/jwt.strategy.ts).
- EmailJS est optionnel, utilise dans [backend/src/utils/emailjs.ts](backend/src/utils/emailjs.ts).
- Un admin par defaut est cree au demarrage a partir de ADMIN_EMAIL/ADMIN_PASSWORD (voir [backend/src/app.service.ts](backend/src/app.service.ts)).

### Frontend (API baseURL)

Le frontend utilise Axios dans [frontend/src/services/api.js](frontend/src/services/api.js). Modifie la baseURL si le backend tourne sur une autre URL/port.

## Lancer le projet

### Backend (API)

```bash
cd backend
npm run start
```

Ou en mode watch :

```bash
npm run start:dev
```

Le port par defaut est 8081 (voir [backend/src/main.ts](backend/src/main.ts)).

### Frontend (Vite)

```bash
cd frontend
npm run dev
```

Vite demarre sur http://localhost:5173.

## Roles et acces

Roles principaux:

- STUDENT
- ENTERPRISE
- ADMIN

La protection des routes est geree par [frontend/src/components/ProtectedRoute.jsx](frontend/src/components/ProtectedRoute.jsx). Le redirect par defaut est:

- STUDENT -> /etudiant/dashboard
- ENTERPRISE -> /entreprise/dashboard
- ADMIN -> /admin/dashboard

## Architecture

```mermaid
flowchart LR
	U[Utilisateur] -->|HTTP| F[Frontend React (Vite)]
	F -->|Axios| B[Backend NestJS API]
	B -->|TypeORM| D[(PostgreSQL)]
	B -->|Static files| UPL[(uploads/)]
```

Notes:

- Le frontend appelle l API via Axios (voir [frontend/src/services/api.js](frontend/src/services/api.js)).
- Le backend sert les fichiers uploades sur /uploads (voir [backend/src/main.ts](backend/src/main.ts)).

## API principales

Base URL par defaut: http://localhost:8081

### Auth

- POST /auth/register
- POST /auth/login
- POST /auth/change-password (JWT requis)
- POST /auth/change-email (JWT requis)
- POST /auth/request-password-reset
- POST /auth/reset-password

Exemple login:

```bash
curl -X POST http://localhost:8081/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"admin@stagelink.bf","password":"password123"}'
```

### Users

- GET /users/profile (JWT requis)
- PATCH /users/profile (JWT requis)
- GET /users/search?q=...&role=STUDENT|ENTERPRISE (JWT requis)
- GET /users/students/:id (JWT requis, ENTERPRISE ou ADMIN)

### Offers

- GET /offers
- GET /offers/:id
- GET /offers/mine (JWT requis)
- POST /offers (JWT requis, ENTERPRISE)
- PATCH /offers/:id (JWT requis, proprietaire)
- PATCH /offers/:id/status (JWT requis)
- DELETE /offers/:id (JWT requis)

### Applications

- POST /applications/:offerId (JWT requis, STUDENT)
- GET /applications/my (JWT requis, STUDENT)
- GET /applications/enterprise (JWT requis, ENTERPRISE)
- PATCH /applications/:id/status (JWT requis, ENTERPRISE)
- GET /applications/:id/profile (JWT requis)

### Notifications

- GET /notifications (JWT requis)
- GET /notifications/unread-count (JWT requis)
- PATCH /notifications/read-all (JWT requis)
- PATCH /notifications/:id/read (JWT requis)
- DELETE /notifications/read (JWT requis)
- DELETE /notifications/:id (JWT requis)

### Admin

- GET /admin/dashboard/stats (JWT requis, ADMIN)
- GET /admin/users (JWT requis, ADMIN)
- GET /admin/users/:id (JWT requis, ADMIN)
- GET /admin/offers (JWT requis, ADMIN)
- GET /admin/applications (JWT requis, ADMIN)
- PATCH /admin/moderate/:offerId (JWT requis, ADMIN)
- PATCH /admin/enterprises/:userId/verify (JWT requis, ADMIN)

## Build et deploy

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm run build
npm run start:prod
```

Pour un deploy, configure les variables d env puis lance le backend et sers le build frontend (ex: via un serveur statique).

## Commandes Windows (PowerShell)

Lancer le backend:

```powershell
Set-Location .\backend
npm run start
```

Lancer le frontend:

```powershell
Set-Location .\frontend
npm run dev
```

Liberer le port 5173 si besoin:

```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Scripts utiles

Frontend:

- npm run dev
- npm run build
- npm run preview
- npm run lint

Backend:

- npm run start
- npm run start:dev
- npm run start:prod
- npm run test
- npm run test:e2e

## Notes

- Les assets uploadees se trouvent dans uploads/.
- Si le port 5173 est occupe, libere le processus avant de lancer le frontend.
