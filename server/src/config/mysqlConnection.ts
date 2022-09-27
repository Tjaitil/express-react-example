import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "db",
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
});
