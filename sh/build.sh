#/!bin/bash

# pulls, builds, deploys current version on droplet

echo "Pulling master..."
sleep 2
cd ~/which_bootcamp
git pull origin master &&
cd ./client 

echo "Building client..."
sleep 2
npm run build &&
mv ~/which_bootcamp/build ~/which_bootcamp

echo "Restarting app..."
sleep 2
cd ~/which_bootcamp
pm2 stop which_bootcamp && pm2 del which_bootcamp && pm2 start process.json -env production

echo "App running!"


