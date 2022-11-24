# CS3219-AY22-23-Project-Skeleton


## User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Set the following variables in the env file: `ENV="PROD"` and `ORIGIN_URL="localhost:3000"`
5. Install npm packages using `npm i`.
6. Run User Service using `npm run dev`.

## Frontend
1. Add the file `.env`. to the root of the frontend folder
2. Set the following variables in the env file: `USER_SERVICE_URL="http://localhost:8000"`, `SOCKET_URL="http://localhost:8001/"`, `LEARNING_SERVICE_URL="http://localhost:8002"` and `QUESTION_SERVICE_URL="http://localhost:8003"`
3. Install npm packages using `npm i`.
4. Run Frontend using `npm start`.

## Matching Service
1. Add the file `.env`. to the root of the matching-service folder
2. Create a Postgresql database locally
3. Add the following database details to the `.env` file: `PG_DB_NAME`, `PG_USER`, `PG_PASSWORD`,`PG_HOST`
4. Configure the frontend URL as `ORIGIN_URL` in the `.env` file as "localhost:3000"
5. Install npm packages using `npm i`.
6. Run Matching Service using `npm start`.

## Question Service
1. Add the file `.env`. to the root of the question-service folder
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file
4. Set the following variables in the env file: `ENV="PROD"` and `ORIGIN_URL="localhost:3000"`
5. Install npm packages using `npm i`.
6. Run Question Service using `npm start`.

## Collab Server
1. Install npm packages using `npm i`.
2. Run Collab Server using `npm start`.

## Learning Pathway Service
1. Add the file `.env`. to the root of the learning-pathway folder
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Set the following variables in the env file: `PORT=8002`, `ENV="PROD"` and `ORIGIN_URL="localhost:3000"`
5. Install npm packages using `npm i`.
6. Run Learning Pathway Service using `npm start`.
