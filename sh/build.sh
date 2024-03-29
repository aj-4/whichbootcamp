#!/bin/bash

# pulls, builds, deploys current version on droplet
ssh aaron@142.93.243.183 << EOF
    echo "Pulling master..."
    sleep 2
    cd ~/whichbootcamp
    git pull origin master &&
    npm install &&
    cd ./client &&
    npm install &&

    echo "Building client..."
    sleep 2
    npm run build &&

    echo "Restarting app..."
    sleep 2
    cd ~/whichbootcamp
    pm2 stop whichbootcamp && pm2 del whichbootcamp && pm2 start process.json --env production

    echo "App running!"
EOF