var assert = require("assert");
var DB = require("modelar").DB;
var config = require("./config/db");

describe("new DB()", function () {
    it("should create a DB instance as expected", function () {
        var db = new DB(config);

        assert.deepEqual(db.config, Object.assign({}, config, {
            charset: "utf8",
            connectionString: "",
            max: 50,
            protocol: "TCPIP",
            ssl: null,
            timeout: 5000
        }));

        assert.equal(db.dsn, "postgres://postgres:postgres@127.0.0.1:5432/modelar");
        assert.equal(db.sql, "");
        assert.deepEqual(db.bindings, []);
        assert.equal(db.insertId, 0);
        assert.equal(db.affectedRows, 0);
        assert.equal(db.command, "");
        assert.deepEqual(db.data, []);
    });
});