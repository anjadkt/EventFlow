#!/bin/sh

set -e

echo "Waiting for MySQL..."

until nc -z db 3306; do
  sleep 2
done

echo "MySQL is ready."

echo "Generating Prisma Client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running Prisma seed..."
npm run seed

echo "Starting backend..."
exec npm run dev