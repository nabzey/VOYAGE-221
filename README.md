# Agence Voyage 221 - API REST

## Installation

```bash
npm install
```

## Configuration

Modifier le fichier `.env` avec vos paramètres PostgreSQL :

```
DATABASE_URL="postgresql://user:password@localhost:5432/agence_voyage?schema=public"
PORT=3000
```

## Initialisation de la base de données

```bash
npx prisma generate
npx prisma migrate dev
```

## Démarrage

```bash
npm start
```

## Documentation Swagger

Accéder à la documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Destinations
- `POST /api/destinations` - Créer une destination
- `GET /api/destinations` - Liste des destinations
- `GET /api/destinations/:id` - Une destination
- `DELETE /api/destinations/:id` - Supprimer une destination

### Circuits
- `POST /api/circuits` - Créer un circuit
- `GET /api/circuits` - Liste des circuits
- `GET /api/circuits/:id` - Un circuit
- `DELETE /api/circuits/:id` - Supprimer un circuit

### Clients
- `POST /api/clients` - Créer un client
- `GET /api/clients` - Liste des clients
- `GET /api/clients/:id` - Un client
- `DELETE /api/clients/:id` - Supprimer un client

### Réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations` - Liste des réservations
- `GET /api/reservations/:id` - Une réservation
