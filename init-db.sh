#!/bin/sh
docker-entrypoint.sh postgres &

# Wait for PostgreSQL to be ready
until pg_isready -U admin -d rlma_db; do
  echo "Waiting for postgres..."
  sleep 2
done

psql -U admin -d rlma_db -f /mnt/db.sql

wait
