import bcrypt from "bcrypt";

// crudUser.js
class Limpeza {
  constructor(pool) {
    this.pool = pool;
    this.tableNameUser = "users";
    this.tableNameAddress = "address";
    this.tableNameVehicle = "vehicle";
  }

  // Função de login
  async limpeza() {
    try {
      const queryAddress = `delete FROM ${this.tableNameAddress}`;
      const resAddress = await this.pool.query(queryAddress);

      const queryVehicle = `delete FROM ${this.tableNameVehicle} `;
      const resVehicle = await this.pool.query(queryVehicle);

      const queryUser = `delete FROM ${this.tableNameUser}`;
      const res = await this.pool.query(queryUser);

      const user = res.rows[0];
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

// module.exports = CRUDUser;
export default Limpeza;
