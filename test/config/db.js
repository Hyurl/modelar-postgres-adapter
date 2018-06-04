var DB = require("modelar").DB;
var PostgresAdapter = require("../../").default;

module.exports = {
    type: "postgres",
    database: "modelar",
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres"
};

DB.setAdapter("postgres", PostgresAdapter);
DB.init(module.exports);