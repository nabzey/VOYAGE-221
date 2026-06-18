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



docker images                          # lister les images locales
docker pull nginx:latest               # télécharger une image
docker build -t monapp:latest .        # builder une image depuis un Dockerfile
docker tag monapp:latest user/monapp   # tagger une image
docker push user/monapp:latest         # pusher sur un registry
docker rmi monapp:latest               # supprimer une image

docker ps                              # conteneurs en cours d'exécution
docker ps -a                           # tous les conteneurs (même stoppés)
docker run -d -p 8080:80 nginx         # lancer un conteneur en arrière-plan
docker run -it ubuntu bash             # lancer en mode interactif
docker stop <id>                       # arrêter un conteneur
docker start <id>                      # redémarrer un conteneur
docker rm <id>                         # supprimer un conteneur
docker rm -f <id>                      # forcer la suppression


docker logs <id>                       # voir les logs
docker logs -f <id>                    # suivre les logs en temps réel
docker exec -it <id> bash              # entrer dans un conteneur
docker inspect <id>                    # infos détaillées JSON
docker stats                           # CPU/RAM en temps réel


docker volume ls                       # lister les volumes
docker volume create monvolume         # créer un volume
docker volume rm monvolume             # supprimer un volume
docker run -v monvolume:/data nginx    # monter un volume


docker compose up                      # lancer les services
docker compose up -d                   # en arrière-plan
docker compose down                    # arrêter et supprimer
docker compose logs -f                 # suivre les logs
docker compose ps                      # état des services
docker compose build                   # rebuilder les images