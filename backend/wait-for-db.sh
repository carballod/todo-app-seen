#!/bin/sh
# Espera hasta que el puerto de MySQL esté disponible

until nc -z -v -w30 $DB_HOST 3306
do
  echo "Esperando a la base de datos en $DB_HOST:3306..."
  sleep 3
done

echo "Base de datos disponible, arrancando backend..."
exec "$@"
