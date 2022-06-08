const mysql = require('mysql2/promise');

const Databases = [
    {
        "database": process.env.DB_SCHEMA_0,
        "username": process.env.DB_USER_0,
        "password": process.env.DB_PASSWORD_0,
        "host": process.env.DB_HOST_0,
    },
    {
        "database": process.env.DB_SCHEMA_1,
        "username": process.env.DB_USER_1,
        "password": process.env.DB_PASSWORD_1,
        "host": process.env.DB_HOST_1,
    },
    {
        "database": process.env.DB_SCHEMA_2,
        "username": process.env.DB_USER_2,
        "password": process.env.DB_PASSWORD_2,
        "host": process.env.DB_HOST_2,
    },
    {
        "database": process.env.DB_SCHEMA_3,
        "username": process.env.DB_USER_3,
        "password": process.env.DB_PASSWORD_3,
        "host": process.env.DB_HOST_3,
    },
]

class Database {
    constructor(database, username, password, host) {
        this.database = database
        this.username = username
        this.password = password
        this.host = host
        this.hostTag = host.split('.')[1]
        this.pool = mysql.createPool({
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database,
            waitForConnections: true,
            connectionLimit: process.env.DB_CONNECTION_LIMIT,
            queueLimit: 0
        })
    }
}

const multiDB = Databases.map((db) => {
    const database = new Database(db.database, db.username, db.password, db.host)
    console.log(`${(database.hostTag)} is connected`)
    return database
})

module.exports = { multiDB }