# Inventory Management System

This is a simple inventory management system for a small business. It is a full-stack application built with Sveltekit, TS, Node.js, Sqlite, pnpm.

## Running the app

- The app will run for a specific location. The location is set in the .env file. Add a .env file in the root of the project with the following content: PRIVATE_LOCATION_ID=1
- run `pnpm install` to install the dependencies
- run `pnpm dev` to start the app
- open `http://localhost:5173` in your browser

## Seeding the database

The inital database can be seeded with a seed.xlsx file. The seed.xlsx file should be placed in the /seed folder.
The seed.xlsx file is in the same format given for the challenge. The seed script will read the file and populate the database with the data.

- run `pnpm seed` to seed the database with the data from the seed.xlsx file

## Running the tests

The tests are written with vitest and mainly test the service layer business logic.

- run `pnpm test` to run the tests

## Docker

For ease of deployment. The app can be run in a docker container. The docker image is built with the following command:

- Open the docker file and change the PRIVATE_LOCATION_ID environment variable to the location you want to run the app for e.g. PRIVATE_LOCATION_ID=1
- Make sure docker daemon is running
- run `pnpm docker:build` to build the docker image and run
- open `http://localhost:3000` in your browser

## Deploy in a local network
N.B. I did not have time to test this out.
To deploy the docker container in a local network:
- Install docker on the machine that will host the app
- Build the docker image as above
- Run the docker container with the following command: `pnpm docker:build`
- Make sure the port 3000 is open on the host machine
- Find the IP address of the machine that is hosting the app. This can be done with the following command: `ipconfig` on Windows
- Open a browser on another machine on the same network and navigate to `http://<ip-address-of-host-machine>:3000`


