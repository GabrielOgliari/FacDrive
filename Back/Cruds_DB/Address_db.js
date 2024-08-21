// crudVehicle.js
class CRUDAddress {
  constructor(pool) {
    this.pool = pool;
    this.tableName = 'address';
  }

  // Create - Inserir um novo usuário
  async create(data, idUser) {
    try {
      // console.log(data);
      const query = `
        INSERT INTO ${this.tableName} 
        (idUser, zipCode, street, neighborhood, city, number, additionalInfo, referencePoint, state) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`;
      const values = [
        idUser,
        data.zipCode,
        data.street,
        data.neighborhood,
        data.city,
        data.number,
        data.additionalInfo,
        data.referencePoint,
        data.state
      ];
      const res = await this.pool.query(query, values);
      // const user = await this.readIdUser(data.Name, data.Surname);
      // console.log("O ID do user:",user);
      // return user, res.rows[0];
      console.log(res.rows[0])
      return res.rows[0]; 
    } catch (error) {
      console.log("Erro:",error);
      throw error;
    }
  }

  //Read - Id vehicle
  async readIdPlate(plate) {
    console.log("Placa:",plate);
    try {
      const query = `SELECT idVehicle FROM ${this.tableName} WHERE plate = $1`;
      const res = await this.pool.query(query, [plate]);
      // console.log("Resposta:",res.rows[0].idVehicle);
      return res.rows[0].idVehicle;
    } catch (error) {
      throw error;
    }
  }

  // Read - Obter todos os veiculos ou um usuário específico
  async read(id) {
    try {
      if (id) {
        const query = `SELECT * FROM ${this.tableName} WHERE idUser = $1`;
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

  // Update - Atualizar um veiculo por um usuario 
  async update(id, data) {
    try {
      const fields = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
      const values = Object.values(data);

      const query = `UPDATE ${this.tableName} SET ${fields} WHERE idUser = $${values.length + 1} RETURNING *`;
      const res = await this.pool.query(query, [...values, id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete - Remover um usuário específico
  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE idUser = $1 RETURNING *`;
      const res = await this.pool.query(query, [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }
}


export default CRUDAddress; 