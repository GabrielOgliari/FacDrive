// crudVehicle.js
class CRUDVehicle {
  constructor(pool) {
    this.pool = pool;
    this.tableName = 'vehicle';
  }

  // Create - Inserir um novo usuário
  async create(data, idUser) {
    try {
      // console.log(data);
      const query = `
        INSERT INTO ${this.tableName} 
        (manufacturingYear, modelYear, color, brand, model, plate, city, state, idUser) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`;
      const values = [
        data.manufacturingYear,
        data.modelYear, 
        data.color,
        data.brand,
        data.model,
        data.plate,
        data.city,
        data.state,
        idUser
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
  async validatePlate(plate) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE plate = $1`;
      const res = await this.pool.query(query, [plate]);
      // console.log(res.rows[0]);
      if (res.rows[0] == undefined) {
        return {"plateAlreadyRegistered": false};
      }
      return {"plateAlreadyRegistered": true};
    } catch (error) {
      throw error;
    }
  }
}

// module.exports = CRUDVehicle;
export default CRUDVehicle; 