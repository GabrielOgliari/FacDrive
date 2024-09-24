// crudDebt.js

class CRUDDebt {
    constructor(pool) {
        this.pool = pool;
        this.tableName = 'debt';
    }

    async addDebt(idRelationship, amount) {
        const query = `INSERT INTO ${this.tableName} (idRelationship, amount) VALUES ($1, $2)`;
        try {
            await this.pool.query(query, [idRelationship, amount]);
        } catch (error) {
            throw error;
        }
    }

    async markAsPaid(idDebt) {
        const query = `DELETE FROM ${this.tableName} WHERE idDebt = $1`;
        try {
            await this.pool.query(query, [idDebt]);
        } catch (error) {
            throw error;
        }
    }

    async listDebts() {
        const query = `SELECT * FROM ${this.tableName}`;
        try {
            const res = await this.pool.query(query);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    async read(idDebt) {
        try {
            if (idDebt) {
                const query = `SELECT * FROM ${this.tableName} WHERE idDebt = $1`;
                const res = await this.pool.query(query, [idDebt]);
                return res.rows[0];
            } else {
                const query = `SELECT * FROM ${this.tableName}`;
                const res = await this.pool.query(query);
                return res.rows;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default CRUDDebt;