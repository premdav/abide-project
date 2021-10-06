#!/bin/bash

cd core-service && pm2 start "yarn start" --name "core-service" && cd ..
sleep 1s
cd front-end && pm2 start "yarn start" --name "front-end" && cd ..
sleep 1s