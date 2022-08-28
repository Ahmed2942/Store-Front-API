# Storefront Backend Project

## Setup
### Connecting to database
You should create database and give it a name, for example, create "store_db" on your system using this command on your database server:
```console
=> CREATE DATABASE store_db;
```
You should create another database for testing and give it a name, for example, create "store_db_test" on your system using this command on your database server:
```console
=> CREATE DATABASE store_db_test;
```
### Port Numbers
Server is running on port 3000
Database is running on port 5432
### Package Installation
I have included package.json file that contains all required packages that you can install it using:
```console
$ npm install
```

## Start
- Typescript
```console
$ npm run start
```
- Javascript (Distribution)
```console
$ npm run start:dist
```
- Watch mode
```console
$ npm run watch
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
### POSTGRES_HOST
### POSTGRES_DB
### POSTGRES_DB_TEST
### POSTGRES_USER
### POSTGRES_PASSWORD
### ENV
### BCRYPT_PASSWORD
### SALT_ROUNDS
### TOKEN_SECRET
