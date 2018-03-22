# Modelar-Postgres-Adapter

**This is an adapter for [Modelar](https://github.com/hyurl/modelar) to** 
**connect PostgreSQL database.**

(This module is internally included by Modelar, you don't have to download it
before using it.)

## How To Use

```javascript
const { DB } = require("modelar");

DB.init({
    type: "postgres",
    database: "modelar",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "******"
});
```

## Warning

If you want to use full features of Modelar with this adapter, you must set an 
`id` field for every table as its primary key.