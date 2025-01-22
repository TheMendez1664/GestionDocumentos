const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class CrudRepository {
    constructor(model) {
        this.model = model;
        this.tableName = model.tableName;
        this.pool = pool;
    }

    async findAll() {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    async findById(id) {
        const sql = `SELECT * FROM ${this.tableName} WHERE idDocumento = ?`;
        const [rows] = await this.pool.query(sql, [id]);
        return rows[0] || null;
    }

    async create(data) {
        const [result] = await this.pool.query(`INSERT INTO ${this.tableName} SET ?`, data);
        return { id: result.insertId, ...data };
    }

    async update(id, data) {
        const sql = `UPDATE ${this.tableName} SET ? WHERE idDocumento = ?`;
        await this.pool.query(sql, [data, id]);
        return this.findById(id);
    }

    async delete(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE idDocumento = ?`;
        const [result] = await this.pool.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = CrudRepository;
