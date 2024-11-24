class CRUDClassDay {
  constructor(pool) {
    this.pool = pool;
    this.tableName = "classdays"; // Substitua pelo nome da sua tabela
  }

  // Método para criar um novo dia da semana
  async create(data) {
    try {
      const query = `
                INSERT INTO classDays 
                (idUser, monday, tuesday, wednesday, thursday, friday, saturday) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *`;
      const values = [
        data.idUser,
        data.monday,
        data.tuesday,
        data.wednesday,
        data.thursday,
        data.friday,
        data.saturday,
      ];

      const res = await this.pool.query(query, values);
      console.log(res.rows[0]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Método de listagem
  async read(user) {
    try {
      let query;
      let values = [];

      if (user) {
        query = `SELECT * FROM ${this.tableName} WHERE idUser = $1`;
        values = [user];
      } else {
        query = `SELECT * FROM ${this.tableName}`;
      }

      const res = await this.pool.query(query, values);

      if (res.rows.length === 0) {
        return null; // Ou você pode retornar uma mensagem indicando que não há registros
      }

      return res.rows;
    } catch (error) {
      throw error;
    }
  }

  // Método de listagem de dias próximos
  async readNearbyDays(user) {
    try {
      let query;
      let values = [];

      if (user) {
        query = `WITH TargetDays AS (
                    SELECT
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday
                    FROM classDays
                    WHERE idUser = $1  
                ),
                UserDays AS (
                    SELECT 
                        u.idUser,
                        u.name,
                        u.surname,
                        u.phone,
                        (CASE WHEN cd.monday THEN 1 ELSE 0 END +
                         CASE WHEN cd.tuesday THEN 1 ELSE 0 END +
                         CASE WHEN cd.wednesday THEN 1 ELSE 0 END +
                         CASE WHEN cd.thursday THEN 1 ELSE 0 END +
                         CASE WHEN cd.friday THEN 1 ELSE 0 END +
                         CASE WHEN cd.saturday THEN 1 ELSE 0 END) AS days_count,
                        -- Contar o número de dias comuns entre o usuário e o usuário alvo
                        (CASE WHEN cd.monday = td.monday THEN 1 ELSE 0 END +
                         CASE WHEN cd.tuesday = td.tuesday THEN 1 ELSE 0 END +
                         CASE WHEN cd.wednesday = td.wednesday THEN 1 ELSE 0 END +
                         CASE WHEN cd.thursday = td.thursday THEN 1 ELSE 0 END +
                         CASE WHEN cd.friday = td.friday THEN 1 ELSE 0 END +
                         CASE WHEN cd.saturday = td.saturday THEN 1 ELSE 0 END) AS common_days_count
                    FROM users u
                    JOIN classDays cd ON u.idUser = cd.idUser
                    CROSS JOIN TargetDays td
                    WHERE u.idUser <> $1
                )
                SELECT
                    ud.idUser,
                    ud.name,
                    ud.surname,
                    ud.days_count,
                    ud.common_days_count,
                    ud.phone,
                    (6 - ud.common_days_count) AS difference  -- Diferença total de dias menos os dias comuns
                FROM UserDays ud
                ORDER BY ud.common_days_count DESC,  -- Ordenar pelos dias comuns (descendente)
                         (6 - ud.common_days_count) ASC  -- Ordenar pela diferença calculada (ascendente)
                LIMIT 6;`;
        values = [user];
      } else {
        query = `SELECT * FROM ${this.tableName}`;
      }

      const res = await this.pool.query(query, values);

      if (res.rows.length === 0) {
        return null; // Ou você pode retornar uma mensagem indicando que não há registros
      }

      return res.rows;
    } catch (error) {
      throw error;
    }
  }

  async update(userId, data) {
    try {
        const query = `
            UPDATE ${this.tableName} 
            SET monday = $2, tuesday = $3, wednesday = $4, thursday = $5, friday = $6, saturday = $7
            WHERE idUser = $1
            RETURNING *`;
        const values = [
            userId,
            data.monday,
            data.tuesday,
            data.wednesday,
            data.thursday,
            data.friday,
            data.saturday,
        ];

        const res = await this.pool.query(query, values);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
}

  
}



export default CRUDClassDay;
