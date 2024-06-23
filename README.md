# Inventory Management System

This is a simple inventory management system for a small business. It is a full-stack application built with Sveltekit, TS, Node.js, Sqlite, pnpm.

## Running the app

- The app will run for a specific location. The location is set in the .env file. Add a .env file in the root of the project with the following content: PUBLIC_LOCATION_ID=1
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

- Make sure docker daemon is running
- run `docker build -t inventory-management-system .` to build the docker image with the name inventory-management-system
- run `docker run inventory-management-system` to run the docker container
- open `http://localhost:3000` in your browser
