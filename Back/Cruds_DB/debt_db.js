// crudDebt.js

class CRUDDebt {
    constructor(pool) {
        this.pool = pool;
        this.tableName = 'debt';
    }

    async addDebt(idrelationship, amount) {
        const query = `INSERT INTO ${this.tableName} (idrelationship, amount) VALUES ($1, $2)`;
        try {
            await this.pool.query(query, [idrelationship, amount]);
        } catch (error) {
            throw error;
        }
    }

    async markAsPaid(idrelationship) {
        const query = `DELETE FROM ${this.tableName} WHERE idrelationship = $1`;
        try {
            await this.pool.query(query, [idrelationship]);
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

    async read(iddebt) {
        try {
            if (iddebt) {
                const query = `SELECT * FROM ${this.tableName} WHERE iddebt = $1`;
                const res = await this.pool.query(query, [iddebt]);
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