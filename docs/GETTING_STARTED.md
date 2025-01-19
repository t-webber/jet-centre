# Telecom Etude Centralised Tool

## Installation

### Requirements

- [Node.js and npm](https://nodejs.org/en/download)
- [Postgresql](https://www.postgresql.org/download/)

### Setting up the database

You will need to create a database for this project. You can do so either

- in your postgresql environment terminal: Install Postgres, then create a local Postgres database and Postgres role with `CREATEDB`, `LOGIN` and `PASSWORD`.  
- With a gui application, such as [pgAdmin4](https://www.pgadmin.org/download/).

With your postgresql login (ofter `postgres`), database name and password, you can make the database url as such:

```txt
postgresql://your_pg_user:your_pg_password@localhost:5432/your_pg_database_name
```

### Environment variables

Add the `DB_URL` variable in your `.env.local` file containing the url mentioned above.

> If you just want to test it locally with access to all pages, you can just set `DEV_MODE=true` and enter rubbish in the 3 `AUTH_` variables.

Generate a random `AUTH_SECRET` (e.g. by using `openssl rand -base64 255`), and set up the following environment variables in a `.env.local` file at the root of the project.

You must also generate a Google Secret and ID. To set those up, refer to this [tutorial](https://www.youtube.com/watch?v=Rs8018RO5YQ).

Here's what your `.env.local` file must look like at this stage:

```bash
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_id
AUTH_GOOGLE_SECRET=your_google_secret

# Database
DB_URL="postgresql://your_pg_user:your_pg_password@localhost:5432/your_pg_database_name?schema=public"

```

### Initialise the database

You know need to initialise your database:

```bash
npx prisma generate
npm run prisma:migrate
```

### Node Setup

Then you can install and run the project:

```bash
npm install 
npm run dev
```
