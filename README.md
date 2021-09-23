<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <h1>NestJS Base Code Integrated MongoDB by Gerpann</h1>
</div>


## Description
Base code for developing RESTful Api Web server quickly using [NestJS](https://nestjs.com/) framework as the main tech.

***

## Intergrating
* [NestJS](https://nestjs.com) (totaly writing with Typescript)
* [Mongoose](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* Logger
* [Swagger](https://swagger.io/) (OpenAPI) for Api documents
* Health check for server status

***

## Getting started (without Docker)
* Install yarn at global scope (recommended)
```bash
$ npm install -g yarn
```
* Then just run this command for install dependencies
```bash
$ yarn
```
* Before the app can run, remember to create `.env` file for store environment variables (it has the same structure with the `.env.example` file availble).
For quickly:
```bash
cp .env.example .env
```

***

## Setup Database
This project has already integrated with [Nestjs-Mongoose Module](https://docs.nestjs.com/techniques/mongodb)<br/>
You just have to edit model (schema) for entities in each module.

***

## Running the app

```bash
# development
$ yarn start

# development with spec (like nodemon)
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

***

## Running app with Docker

### Requirements
* Docker
* Docker compose

### Command
```bash
# Remove folder data(contains database data in container) if exist
$ sudo rm -rf data

# Execute app
$ docker-compose up
```

***

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

***

## Stay in touch

* Author - [Gerpan](https://github.com/gerpann)
* Facebook - [Gerpan](https://www.facebook.com/gerpan.4701)
* Other Nestjs base with Typeorm integrated with RDMS - [NestJS-Base](https://github.com/gerpann/nestjs-base)