#!/bin/bash

# Variables d'environnement
export DOCKER_USERNAME="ton_username_docker"
export DB_PASSWORD="ton_mot_de_passe_db"

# Arrêter les conteneurs existants
docker-compose -f docker-compose.prod.yml down

# Récupérer les dernières images
docker pull ${DOCKER_USERNAME}/todo-frontend:latest
docker pull ${DOCKER_USERNAME}/todo-backend:latest
docker pull postgres:16

# Démarrer les conteneurs
docker-compose -f docker-compose.prod.yml up -d

# Vérifier que tout fonctionne
docker-compose -f docker-compose.prod.yml ps 