// db.js

import pkg from 'pg';
const { Pool } = pkg;

// Configuração da conexão com o banco de dados PRODUÇÃO
const pool = new Pool({
  user: 'postgres.weiginvoqhdyjibbrjux',      // Substitua com seu usuário do PostgreSQL
  host: 'aws-0-us-west-1.pooler.supabase.com',        // Substitua com o host do seu banco de dados
  database: 'postgres',    // Substitua com o nome do seu banco de dados
  password: 'GaiteiroGostoso1@',    // Substitua com sua senha do PostgreSQL
  port: 6543,               // Substitua com a porta do seu PostgreSQL (geralmente 5432)
});

// const pool = new Pool({
//   user: 'postgres',      // Substitua com seu usuário do PostgreSQL
//   host: 'localhost',        // Substitua com o host do seu banco de dados
//   database: 'FacDrive',    // Substitua com o nome do seu banco de dados
//   password: 'masterkey',    // Substitua com sua senha do PostgreSQL
//   port: 5432,               // Substitua com a porta do seu PostgreSQL (geralmente 5432)
// });

export default pool; 
