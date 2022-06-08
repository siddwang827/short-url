// const mysql = require('mysql2/promise');
const { multiDB } = require('./database.js')
const writeHost = process.env.DB_WRITE_HOST
const _ = require('lodash')

class AutoIncrement {
    constructor(longUrl) {
        this.longUrl = longUrl
    }

    static async getLongUrl(hostTag, id) {
        const readHost = _.findIndex(multiDB, (db) => { return db.hostTag === hostTag })
        const sql = " SELECT * FROM autoincrement where id = ? "
        const [[result]] = await multiDB[readHost].pool.query(sql, [id])
        return result
    }

    static async createShortUrl(longUrl) {
        const sql = " INSERT INTO system_design_short_url.autoincrement (long_url) VALUES (?) "
        const [result] = await multiDB[writeHost].pool.query(sql, longUrl)
        return result
    }
}

module.exports = { AutoIncrement }; 