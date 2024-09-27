import bcrypt from "bcrypt";

// crudUser.js
class CRUDUser {
  constructor(pool) {
    this.pool = pool;
    this.tableName = "users";
  }

  // Create - Inserir um novo usuário
  async create(data) {
    try {
      // Criptografar a senha antes de armazenar
      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log(data);
      const query = `
        INSERT INTO ${this.tableName} 
        (cpf, registration, name, surname, birthDate, driverLicense, phone, isDriver, institutionalEmail, password, gender) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`;
      const values = [
        data.cpf,
        data.registration,
        data.name,
        data.surname,
        data.birthDate,
        data.driverLicense,
        data.phone,
        data.isDriver,
        data.institutionalEmail,
        hashedPassword, // Armazenar a senha criptografada
        data.gender,
      ];
      const res = await this.pool.query(query, values);
      // const user = await this.readIdUser(data.Name, data.Surname);
      // console.log("O ID do user:",user);
      // return user, res.rows[0];
      console.log(res.rows[0]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Função de login
  async login(email, password) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE institutionalEmail = $1`;
      const res = await this.pool.query(query, [email]);
      const user = res.rows[0];

      if (!user) {
        return { success: false, message: "Email não encontrado" };
      }

      // Comparar a senha fornecida com a senha criptografada armazenada
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { success: false, message: "Senha incorreta" };
      }

      return { success: true, userId: user.iduser };
    } catch (error) {
      throw error;
    }
  }

  //Read - Id User
  async readIdUser(name, surname) {
    console.log("Nome:", name);
    console.log("Sobrenome:", surname);
    try {
      const query = `SELECT idUser FROM ${this.tableName} WHERE name = $1 AND surname = $2`;
      const res = await this.pool.query(query, [name, surname]);
      console.log("Resposta:", res.rows[0].id_user);
      return res.rows[0].id_user;
    } catch (error) {
      throw error;
    }
  }

  // Read - Obter todos os usuários ou um usuário específico
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

  // Update - Atualizar um usuário específico
  async update(id, data) {
    try {
      const fields = Object.keys(data)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const values = Object.values(data);

      const query = `UPDATE ${this.tableName} SET ${fields} WHERE idUser = $${
        values.length + 1
      } RETURNING *`;
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
  async validateEmail(email) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE institutionalEmail = $1`;
      const res = await this.pool.query(query, [email]);
      // console.log(res.rows[0]);
      if (res.rows[0] == undefined) {
        return { emailAlreadyRegistered: false };
      } else {
        return { emailAlreadyRegistered: true };
      }
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async validateCpf(cpf) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE cpf = $1`;
      const res = await this.pool.query(query, [cpf]);
      // console.log(res.rows[0]);
      if (res.rows[0] == undefined) {
        return { cpfAlreadyRegistered: false };
      }
      return { cpfAlreadyRegistered: true };
    } catch (error) {
      throw error;
    }
  }

  async read_userImage(id) {
    try {
      const query = `SELECT userImage FROM ${this.tableName} WHERE idUser = $1`;
      const res = await this.pool.query(query, [id]);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async post_userImage(data) {
    try {
      const query = `update ${this.tableName} SET userImage = $1 WHERE idUser = $2`;
      const values = [
        data.userImage, 
        data.idUser,
      ];
      const res = await this.pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

// module.exports = CRUDUser;
export default CRUDUser;
