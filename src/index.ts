import { Adapter, DB, Table, Query } from "modelar";
import { Pool, PoolClient, PoolConfig } from "pg";
import assign = require("lodash/assign");

function getInsertId(db: DB, row: object, fields: any[]): number {
    var primary: string = db["primary"] || "id";

    for (let field of fields) {
        if (field.name.toLowerCase() === primary)
            return row[field.name];
    }
    return 0;
}

export class PostgresAdapter extends Adapter {
    backquote = "\"";
    connection: PoolClient;

    static Pools: { [dsn: string]: Pool } = {};

    connect(db: DB): Promise<DB> {
        var dsn = db.dsn;
        let config: PoolConfig = <any>assign({}, db.config);

        if (PostgresAdapter.Pools[dsn] === undefined) {

            config.connectionTimeoutMillis = db.config.timeout;
            config.idleTimeoutMillis = db.config.timeout;
            config["statement_timeout"] = db.config.timeout;

            PostgresAdapter.Pools[dsn] = new Pool(config);
        }

        return PostgresAdapter.Pools[dsn].connect().then(client => {
            this.connection = client;
            return db;
        });
    }

    query(db: DB, sql: string, bindings?: any[]): Promise<DB> {
        var command = db.command;

        // Return the record when inserting.
        if (command == "insert" && sql.search(/returning\s/i) <= 0)
            sql += " returning *";

        // Replace ? to ${n} of the SQL.
        for (let i in bindings) {
            sql = sql.replace("?", "$" + (parseInt(i) + 1));
        }

        return this.connection.query(sql, bindings).then(res => {
            if (!(res instanceof Array)) {
                db.affectedRows = res.rowCount || 0;
                if (command == "insert") {
                    // Deal with insert statements.
                    db.insertId = getInsertId(db, res.rows[0], res.fields);
                } else if (res.rows.length || command == "select") {
                    // Deal with other statements.
                    let data = [];
                    for (let row of res.rows) {
                        data.push(assign({}, row));
                    }
                    db.data = data;
                }
            } else {
                db.affectedRows = res.rowCount || 0;

                if (command == "insert") {
                    // Deal with insert statements.
                    let _res = res[res.length - 1];
                    db.insertId = getInsertId(db, _res.rows[0], _res.fields);
                } else {
                    let data = [];
                    for (let _res of res) {
                        if (_res.rows.length) {
                            for (let row of res.rows) {
                                data.push(assign({}, row));
                            }
                        }
                    }
                    db.data = data;
                }
            }
            return db;
        });
    }

    release(): void {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    }

    close(): void {
        if (this.connection) {
            this.connection.release();
            // this.connection.end();
            this.connection = null;
        }
    }

    static close(): void {
        for (let i in PostgresAdapter.Pools) {
            PostgresAdapter.Pools[i].end();
            delete PostgresAdapter.Pools[i];
        }
    }

    getDDL(table: Table) {
        var serials = ["smallserial", "serial", "bigserial"],
            columns: string[] = [],
            foreigns: string[] = [];
        var primary: string;
        var autoIncrement: string;

        for (let key in table.schema) {
            let field = table.schema[key];
            if (field.primary && field.autoIncrement) {
                if (serials.indexOf(field.type.toLowerCase()) === -1) {
                    field.type = "serial";
                }

                field.length = 0;
                if (field.autoIncrement instanceof Array) {
                    let name = table.name + "_" + field.name + "_seq",
                        increment = field.autoIncrement[1],
                        start = field.autoIncrement[0];

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
            } else if (field.length) {
                field.type += "(" + field.length + ")";
            }

            let column = table.backquote(field.name) + " " + field.type;

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
                let foreign = `foreign key (${table.backquote(field.name)})`
                    + " references " + table.backquote(field.foreignKey.table)
                    + " (" + table.backquote(field.foreignKey.field) + ")"
                    + " on delete " + field.foreignKey.onDelete
                    + " on update " + field.foreignKey.onUpdate;

                foreigns.push(foreign);
            };

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
    }

    limit(query: Query, length: number, offset?: number): Query {
        let limit = offset ? length + " offset " + offset : length;
        query["_limit"] = limit;
        return query;
    }
}

export default PostgresAdapter;