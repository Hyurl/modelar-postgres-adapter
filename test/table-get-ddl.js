var assert = require("assert");
var Table = require("modelar").Table;

describe("Table.prototype.getDDL()", function () {
    it("should generate DDL as expected", function () {
        var table = new Table("articles");

        table.addColumn("id").primary().autoIncrement();
        table.addColumn("title", "varchar", 255).unique().notNull();
        table.addColumn("content", "text");
        table.addColumn("user_id", "int").default(null).foreignKey("users", "id");

        assert.equal(table.getDDL(), [
            'create table "articles" (',
            '\t"id" serial,',
            '\t"title" varchar(255) unique not null,',
            '\t"content" text,',
            '\t"user_id" int default null,',
            '\tprimary key ("id"),',
            '\tforeign key ("user_id") references "users" ("id") on delete set null on update no action',
            ')'
        ].join("\n"));
    });
});