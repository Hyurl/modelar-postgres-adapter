"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var modelar_1 = require("modelar");
var pg_1 = require("pg");
var assign = require("lodash/assign");
function getInsertId(db, row, fields) {
    var primary = db["primary"] || "id";
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        if (field.name.toLowerCase() === primary)
            return row[field.name];
    }
    return 0;
}
var PostgresAdapter = (function (_super) {
    tslib_1.__extends(PostgresAdapter, _super);
    function PostgresAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backquote = "\"";
        return _this;
    }
    PostgresAdapter.prototype.connect = function (db) {
        var _this = this;
        var dsn = db.dsn;
        var config = assign({}, db.config);
        if (PostgresAdapter.Pools[dsn] === undefined) {
            config.connectionTimeoutMillis = db.config.timeout;
            config.idleTimeoutMillis = db.config.timeout;
            config["statement_timeout"] = db.config.timeout;
            PostgresAdapter.Pools[dsn] = new pg_1.Pool(config);
        }
        return PostgresAdapter.Pools[dsn].connect().then(function (client) {
            _this.connection = client;
            return db;
        });
    };
    PostgresAdapter.prototype.query = function (db, sql, bindings) {
        var command = db.command;
        if (command == "insert" && sql.search(/returning\s/i) <= 0)
            sql += " returning *";
        for (var i in bindings) {
            sql = sql.replace("?", "$" + (parseInt(i) + 1));
        }
        return this.connection.query(sql, bindings).then(function (res) {
            if (!(res instanceof Array)) {
                db.affectedRows = res.rowCount || 0;
                if (command == "insert") {
                    db.insertId = getInsertId(db, res.rows[0], res.fields);
                }
                else if (res.rows.length || command == "select") {
                    var data = [];
                    for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                        var row = _a[_i];
                        data.push(assign({}, row));
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
                    var data = [];
                    for (var _b = 0, res_1 = res; _b < res_1.length; _b++) {
                        var _res = res_1[_b];
                        if (_res.rows.length) {
                            for (var _c = 0, _d = res.rows; _c < _d.length; _c++) {
                                var row = _d[_c];
                                data.push(assign({}, row));
                            }
                        }
                    }
                    db.data = data;
                }
            }
            return db;
        });
    };
    PostgresAdapter.prototype.release = function () {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    };
    PostgresAdapter.prototype.close = function () {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    };
    PostgresAdapter.close = function () {
        for (var i in PostgresAdapter.Pools) {
            PostgresAdapter.Pools[i].end();
            delete PostgresAdapter.Pools[i];
        }
    };
    PostgresAdapter.prototype.getDDL = function (table) {
        var serials = ["smallserial", "serial", "bigserial"], columns = [], foreigns = [];
        var primary;
        var autoIncrement;
        for (var key in table.schema) {
            var field = table.schema[key];
            if (field.primary && field.autoIncrement) {
                if (serials.indexOf(field.type.toLowerCase()) === -1) {
                    field.type = "serial";
                }
                field.length = 0;
                if (field.autoIncrement instanceof Array) {
                    var name = table.name + "_" + field.name + "_seq", increment = field.autoIncrement[1], start = field.autoIncrement[0];
                    if (increment > 1 || start > 1) {
                        autoIncrement = "alter sequence "
                            + table.backquote(name)
                            + (increment > 1 ? " increment by " + increment : "")
                            + (start > 1 ? " start with " + start : "");
                    }
                }
            }
            if (field.length instanceof Array) {
                field.type += "(" + field.length.join(",") + ")";
            }
            else if (field.length) {
                field.type += "(" + field.length + ")";
            }
            var column = table.backquote(field.name) + " " + field.type;
            if (field.primary)
                primary = field.name;
            if (field.unique)
                column += " unique";
            if (field.unsigned)
                column += " unsigned";
            if (field.notNull)
                column += " not null";
            if (field.default === null)
                column += " default null";
            else if (field.default !== undefined)
                column += " default " + table.quote(field.default);
            if (field.comment)
                column += " comment " + table.quote(field.comment);
            if (field.foreignKey && field.foreignKey.table) {
                var foreign = "foreign key (" + table.backquote(field.name) + ")"
                    + " references " + table.backquote(field.foreignKey.table)
                    + " (" + table.backquote(field.foreignKey.field) + ")"
                    + " on delete " + field.foreignKey.onDelete
                    + " on update " + field.foreignKey.onUpdate;
                foreigns.push(foreign);
            }
            ;
            columns.push(column);
        }
        var sql = "create table " + table.backquote(table.name) +
            " (\n\t" + columns.join(",\n\t");
        if (primary)
            sql += ",\n\tprimary key (" + table.backquote(primary) + ")";
        if (foreigns.length)
            sql += ",\n\t" + foreigns.join(",\n\t");
        sql += "\n)";
        if (autoIncrement)
            sql += ";\n" + autoIncrement;
        return sql;
    };
    PostgresAdapter.prototype.limit = function (query, length, offset) {
        var limit = offset ? length + " offset " + offset : length;
        query["_limit"] = limit;
        return query;
    };
    PostgresAdapter.Pools = {};
    return PostgresAdapter;
}(modelar_1.Adapter));
exports.PostgresAdapter = PostgresAdapter;
exports.default = PostgresAdapter;
//# sourceMappingURL=index.js.map