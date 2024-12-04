#!/bin/bash

for file in ./migrations/*.up.sql; do
    echo "Running migration: $file"
    psql -U alma_user -d dresdendb -f "$file" || exit 1
done
