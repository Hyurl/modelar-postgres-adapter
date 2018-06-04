# Modelar-Postgres-Adapter

**This is an adapter for [Modelar](https://github.com/hyurl/modelar) to** 
**connect PostgreSQL database.**

## Prerequisites

- `NodeJS` version higher than 4.5.0.

## Install

```sh
npm i modelar-postgres-adapter --save
```

## How To Use

```javascript
const { DB } = require("modelar");
const { PostgresAdapter } = require("modelar-postgres-adapter");

DB.setAdapter("postgres", PostgresAdapter);

// then you can use type 'postgres' in db.config
DB.init({
    type: "postgres",
    database: "modelar",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres"
});
```

## A Tip

Since PostgreSQL doesn't return the last insert ID while running a insert 
statement, this package uses a trick to compatible with Model requirements.

In a model instance, the `insertId` will be the value of the primary key, but 
other scenarios, you may need to set an `id` field for every table you want 
the `insertId` to be available.

In my experience, PostgreSQL doesn't order the records by id (the primary key) 
by default like MySQL, so it's always better to explicitly calling 
`query.orderBy()` when you're fetching multiple rows of records.