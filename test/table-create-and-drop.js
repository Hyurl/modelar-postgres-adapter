var assert = require("assert");
var DB = require("modelar").DB;
var Table = require("modelar").Table;
var config = require("./config/db");

describe("Table.prototype.create() and Table.prototype.drop()", function () {
    it("should create a new table and drop it as expected", function (done) {
        var db = new DB(config),
            table = new Table("articles").use(db);

        table.addColumn("id").primary().autoIncrement(100);
        table.addColumn("title", "varchar", 255).unique().notNull();
        table.addColumn("content", "text");

        table.create().then(function () {
            assert.equal(table.sql, [
                "create table \"articles\" (",
                "\t\"id\" serial,",
                "\t\"title\" varchar(255) unique not null,",
                "\t\"content\" text,",
                "\tprimary key (\"id\")",
                ");",
                'alter sequence "articles_id_seq" restart with 100'
            ].join("\n"));
        }).then(function () {
            return table.drop();
        }).then(function () {
            assert.equal(table.sql, "drop table \"articles\"");
            db.close();
            done();
        }).catch(function (err) {
            db.close();
            done(err);
        });
    });
});