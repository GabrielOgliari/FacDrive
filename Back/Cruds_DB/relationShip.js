class CRUDRelationship {
    constructor(pool) {
        this.pool = pool;
        this.tableName = 'relationship'; 
    }

    // Método para criar um novo relacionamento
    async create(data) {
        try {
            const query = `
                INSERT INTO ${this.tableName} 
                (driverId, riderId, amount) 
                VALUES ($1, $2, $3) 
                RETURNING *`;
            const values = [
                data.driverId,
                data.riderId,
                data.amount
            ];
            const res = await this.pool.query(query, values);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Método para ler relacionamentos
    async read(id) {
        try {
            let query;
            let values = [];

            if (id) {
                query = `SELECT * FROM ${this.tableName} WHERE idRelationship = $1`;
                values = [id];
            } else {
                query = `SELECT * FROM ${this.tableName}`;
            }

            const res = await this.pool.query(query, values);

            if (res.rows.length === 0) {
                return null; 
            }

            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um relacionamento
    async update(id, data) {
        try {
            // Verificar se o relacionamento existe e obter os valores atuais
            const currentQuery = `SELECT driverId, riderId, amount FROM ${this.tableName} WHERE idRelationship = $1`;
            const currentRes = await this.pool.query(currentQuery, [id]);
            if (currentRes.rows.length === 0) {
                throw new Error('Relacionamento não encontrado');
            }
            const currentRelationship = currentRes.rows[0];

            // Determinar o novo valor de amount
            let newAmount;
            if (data.amount === 0) {
                newAmount = 0; // Zerar o valor
            } else {
                newAmount = parseFloat(currentRelationship.amount) + parseFloat(data.amount); // Somar o valor atual com o novo valor
            }

            // Atualizar apenas o campo amount
            const query = `
                UPDATE ${this.tableName} 
                SET amount = $1 
                WHERE idRelationship = $2 
                RETURNING *`;
            const values = [
                newAmount,
                id
            ];
            const res = await this.pool.query(query, values);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    // Método para deletar um relacionamento
    async delete(id) {
        try {
            const query = `DELETE FROM ${this.tableName} WHERE idRelationship = $1 RETURNING *`;
            const values = [id];
            const res = await this.pool.query(query, values);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Método para listar relacionamentos de um usuário específico
    async listByUser(userId) {
        try {
            const query = `SELECT * FROM ${this.tableName} WHERE driverId = $1 OR riderId = $1`;
            const values = [userId];
            const res = await this.pool.query(query, values);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    async listByUserWithDetails(userId) {
        try {
            const query = `
                SELECT 
                    relationship.idRelationship,
                    driver.idUser AS driverId,
                    driver.name AS driverName,
                    driver.surname AS driverSurname,
                    rider.idUser AS riderId,
                    rider.name AS riderName,
                    rider.surname AS riderSurname,
                    relationship.amount
                FROM 
                    ${this.tableName} 
                JOIN 
                    users driver ON relationship.driverId = driver.idUser
                JOIN 
                    users rider ON relationship.riderId = rider.idUser
                WHERE 
                    driver.idUser = $1 OR rider.idUser = $1;
            `;
            const values = [userId];

            const res = await this.pool.query(query, values);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    
}

export default CRUDRelationship;