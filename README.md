# Modelar-Postgres-Adapter

**This is an adapter for [Modelar](http://modelar.hyurl.com) to connect**
**PostgreSQL database.**
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