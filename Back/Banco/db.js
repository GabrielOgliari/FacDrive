// db.js
const { Pool } = require('pg');

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres.weiginvoqhdyjibbrjux',      // Substitua com seu usuário do PostgreSQL
  host: 'aws-0-us-west-1.pooler.supabase.com',        // Substitua com o host do seu banco de dados
  database: 'postgres',    // Substitua com o nome do seu banco de dados
  password: 'GaiteiroGostoso1@',    // Substitua com sua senha do PostgreSQL
  port: 6543,               // Substitua com a porta do seu PostgreSQL (geralmente 5432)
});

// pool.on('connect', () => {
//   console.log("Conectado ao banco de dados PostgreSQL");
// });

// pool.on('error', (err) => {
//   console.error('Erro inesperado no pool de conexão PostgreSQL', err);
// });

module.exports = pool;