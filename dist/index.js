"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelar_1 = require("modelar");
const pg_1 = require("pg");
function getInsertId(db, row, fields) {
    var primary = db["primary"] || "id";
    for (let field of fields) {
        if (field.name.toLowerCase() === primary)
            return row[field.name];
    }
    return 0;
}
;
class PostgresAdapter extends modelar_1.Adapter {
    constructor() {
        super(...arguments);
        this.backquote = "\"";
    }
    connect(db) {
        var dsn = db.dsn;
        if (PostgresAdapter.Pools[dsn] === undefined) {
            PostgresAdapter.Pools[dsn] = new pg_1.Pool(db.config);
        }
        return PostgresAdapter.Pools[dsn].connect().then(client => {
            this.connection = client;
            return db;
        });
    }
    query(db, sql, bindings) {
        var command = db.command;
        if (command == "insert" && sql.search(/returning\s/i) <= 0)
            sql += " returning *";
        for (let i in bindings) {
            sql = sql.replace("?", "$" + (parseInt(i) + 1));
        }
        return this.connection.query(sql, bindings).then((res) => {
            if (!(res instanceof Array)) {
                db.affectedRows = res.rowCount || 0;
                if (command == "insert") {
                    db.insertId = getInsertId(db, res.rows[0], res.fields);
                }
                else if (res.rows.length) {
                    let data = [];
                    for (let row of res.rows) {
                        data.push(Object.assign({}, row));
                    }
                    db.data = data;
                }
            }
            else {
                db.affectedRows = res.rowCount || 0;
                if (command == "insert") {
                    var _res = res[res.length - 1];
                    db.insertId = getInsertId(db, _res.rows[0], _res.fields);
                }
                else {
                    let data = [];
                    for (let __res of res) {
                        if (__res.rows.length) {
                            for (let row of res.rows) {
                                data.push(Object.assign({}, row));
                            }
                        }
                    }
                    db.data = data;
                }
            }
            return db;
        });
    }
    release() {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    }
    close() {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    }
    static close() {
        for (let i in PostgresAdapter.Pools) {
            PostgresAdapter.Pools[i].end();
            delete PostgresAdapter.Pools[i];
        }
    }
    getDDL(table) {
        var serials = ["smallserial", "serial", "bigserial"], columns = [], foreigns = [];
        var primary;
        var autoIncrement;
        for (let key in table.schema) {
            let field = table.schema[key];
            if (field.primary && field.autoIncrement) {
                if (!serials.includes(field.type.toLowerCase())) {
                    field.type = "serial";
                }
                field.length = 0;
                if (field.autoIncrement instanceof Array) {
                    autoIncrement = `alter sequence ${table.name}_${field.name}_seq restart with ${field.autoIncrement[0]}`;
                }
            }
            if (field.length instanceof Array) {
                field.type += "(" + field.length.join(",") + ")";
            }
            else if (field.length) {
                field.type += "(" + field.length + ")";
            }
            let column = table.backquote(field.name) + " " + field.type;
            if (field.primary)
                primary = field.name;
            if (field.default === null)
                column += " default null";
            else if (field.default !== undefined)
                column += " default " + table.quote(field.default);
            if (field.notNull)
                column += " not null";
            if (field.unsigned)
                column += " unsigned";
            if (field.unique)
                column += " unique";
            if (field.comment)
                column += " comment " + table.quote(field.comment);
            if (field.foreignKey.table) {
                let foreign = `foreign key (${table.backquote(field.name)})` +
                    " references " + table.backquote(field.foreignKey.table) +
                    " (" + table.backquote(field.foreignKey.field) + ")" +
                    " on delete " + field.foreignKey.onDelete +
                    " on update " + field.foreignKey.onUpdate;
                foreigns.push(foreign);
            }
            ;
            columns.push(column);
        }
        var sql = "create table " + table.backquote(table.name) +
            " (\n\t" + columns.join(",\n\t");
        if (primary)
            sql += ",\n\tprimary key(" + table.backquote(primary) + ")";
        if (foreigns.length)
            sql += ",\n\t" + foreigns.join(",\n\t");
        sql += "\n)";
        if (autoIncrement)
            sql += ";\n" + autoIncrement;
        return sql;
    }
    limit(query, length, offset) {
        let limit = offset ? length + " offset " + offset : length;
        query["_limit"] = limit;
        return query;
    }
}
PostgresAdapter.Pools = {};
exports.PostgresAdapter = PostgresAdapter;
//# sourceMappingURL=index.js.map