# Storefront Backend Project

## Table of Contents

- [Storefront Backend Project](#storefront-backend-project)
  - [Table of Contents](#table-of-contents)
  - [project description](#project-description)
  - [ports](#ports)
    - [postgres](#postgres)
    - [server](#server)
  - [connect to the database](#connect-to-the-database)
  - [package installation instructions](#package-installation-instructions)
  - [entrypoint](#entrypoint)
  - [jwt](#jwt)

## project description
it is starting project to learn how to setup Project Environment using express , typescript and jasmine for unit testing , postgres for database
## ports
### postgres
ports 5432
### server
ports 3000
##  connect to the database 
first download and install postgres (https://www.postgresql.org/download/) (my OS is windows)
open psql
write[
  postgres=# CREATE ROLE "Storefront-dev" WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE NOREPLICATION PASSWORD '123456';
  postgres=# CREATE DATABASE "Storefront" WITH OWNER = "Storefront-dev";
  postgres=# CREATE DATABASE "Storefront_test" WITH OWNER = "Storefront-dev";
  ]
## package installation instructions
yarn init or npm init
yarn or npm install
db-migrate up
yarn start (to start server)
yarn test  (to start jasmine for test)
## entrypoint
the entry point is index.js and we read in the terminal is node ./dist/.
## jwt
if you use postman 
find the token in header of the post request ('/user/signup') or ('/user/login') and used in the other request that need token
