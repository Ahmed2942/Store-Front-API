# Storefront Backend Project

## Setup
### Connecting to database
You should create database and give it a name, for example, create "store_db" on your system using this command on your database server:
```console
=> CREATE DATABASE DB_NAME;
```
You should create another database for testing and give it a name, for example, create "store_db_test" on your system using this command on your database server:
```console
=> CREATE DATABASE TEST_DB_NAME;
```
### Port Numbers
- Server is running on port 3000
- Database is running on port 5432
### Package Installation
I have included package.json file that contains all required packages that you can install it using:
```console
$ npm install
```
## Deploy
This API is ready for automated deployment on AWS Elastic Beanstalk using CircleCI.
```console
$ npm run deploy
```

## Start
- Typescript (Development)
```console
$ npm run dev
```
- Watch mode (Development)
```console
$ npm run watch
```
- Javascript (Distribution)
```console
$ npm run start
```

## Build Database Schema
```console
$ npx db-migrate up
```

## Testing
```console
$ npm run test
```

## Envrionment Variables
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_DB_TEST
- POSTGRES_USER
- POSTGRES_PASSWORD
- ENV
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET
