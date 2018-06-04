var assert = require("assert");
var DB = require("modelar").DB;
var config = require("./config/db");

describe("DB.prototype.use()", function () {
    it("should use an existing DB instance and its connections as expected", function () {
        var db = new DB(config);
        var db2 = new DB().use(db);

        assert.deepEqual(db2.config, Object.assign({}, config, {
            charset: "utf8",
            connectionString: "",
            max: 50,
            protocol: "TCPIP",
            ssl: null,
            timeout: 5000
        }));

        assert.equal(db2.dsn, "postgres://postgres:postgres@127.0.0.1:5432/modelar");

        assert.equal(db2.adapter, db.adapter);
    });
});