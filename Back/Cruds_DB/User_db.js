// crudUser.js
class CRUDUser {
  constructor(pool) {
    this.pool = pool;
    this.tableName = 'Users';
  }

  // Create - Inserir um novo usuário
  async create(data) {
    try {
      // console.log(data);
      const query = `
        INSERT INTO ${this.tableName} 
        (CPF, Registration, Name, Surname, BirthDate, DriverLicense, Phone, UserType, institutionalEmail, Password) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *`;
      const values = [
        data.CPF,
        data.Registration, 
        data.Name,
        data.Surname,
        data.BirthDate,
        data.DriverLicense,
        data.Phone,
        data.UserType,
        data.institutionalEmail,
        data.Password
      ];
      const res = await this.pool.query(query, values);
      // const user = await this.readIdUser(data.Name, data.Surname);
      // console.log("O ID do user:",user);
      // return user, res.rows[0];
      return res.rows[0]; 
    } catch (error) {
      throw error;
    }
  }

  //Read - Id User
  async readIdUser(name, surname) {
    console.log("Nome:",name);
    console.log("Sobrenome:",surname);
    try {
      const query = `SELECT id_user FROM ${this.tableName} WHERE Name = $1 AND Surname = $2`;
      const res = await this.pool.query(query, [name, surname]);
      console.log("Resposta:",res.rows[0].id_user);
      return res.rows[0].id_user;
    } catch (error) {
      throw error;
    }
  }

  // Read - Obter todos os usuários ou um usuário específico
  async read(id) {
    try {
      if (id) {
        const query = `SELECT * FROM ${this.tableName} WHERE ID_User = $1`;
        const res = await this.pool.query(query, [id]);
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

  // Update - Atualizar um usuário específico
  async update(id, data) {
    try {
      const fields = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
      const values = Object.values(data);

      const query = `UPDATE ${this.tableName} SET ${fields} WHERE ID_User = $${values.length + 1} RETURNING *`;
      const res = await this.pool.query(query, [...values, id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete - Remover um usuário específico
  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE ID_User = $1 RETURNING *`;
      const res = await this.pool.query(query, [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CRUDUser;
