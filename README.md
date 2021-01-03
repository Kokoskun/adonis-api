# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication (JWT && Client Credentials)
3. CORS
4. Lucid ORM (Database PostgreSQL)
5. Migrations and seeds
6. Logger winston

## Setup
You can install the package from npm.
`npm i -g @adonisjs/cli`

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
```dosini
HOST=127.0.0.1
PORT=8000
NODE_ENV=development
APP_NAME=Adonis-API
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=g5OcFREZRRfBR3SrfzbYyGmmSI1uyOLJ
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=postgres
HASH_DRIVER=bcrypt
CLIENT_ID=d13d2a8e8db74d39b0179fbba03ed60c
CLIENT_SECRET=2b91905f347d07767307e491950fb1b92907f9e80a0fbe47b7b530ee36e3da4f
JWT_KEY=703944f9c3242b31124bbf49d5ab7784d6cd9f3f8577bce5403d69fb704320e69f6ab757591cc30891690ab8c1b5c0ac5ecf5e3c0a716d570c83300b190d9616
```
and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
and then run startup seeds `adonis seed`.

### Run
Script for Deployment
`npm run dev`