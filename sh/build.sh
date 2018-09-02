#/!bin/bash

# pulls, builds, deploys current version on droplet

echo "Pulling master..."
sleep 2
cd ~/whichbootcamp
git pull origin master &&
npm install &&
cd ./client &&
npm install

echo "Building client..."
sleep 2
npm run build &&
mv ~/whichbootcamp/client/build ~/whichbootcamp

echo "Restarting app..."
sleep 2
cd ~/whichbootcamp
pm2 stop which_bootcamp && pm2 del which_bootcamp && pm2 start process.json --env production

echo "App running!"


