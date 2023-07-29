#!/bin/bash
set -e

# Wait for the database service to be ready before starting the application
./wait-for-it.sh db:3306 --timeout=60

# Start your main application here
node index.js
