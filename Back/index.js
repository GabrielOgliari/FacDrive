const express = require('express');
const pool = require('./Banco/db');
const CRUDUser = require('./Cruds_DB/User_db');
const app = express();
app.use(express.json())
const port = 3000;

// Endpoint básico que retorna "Hello, World!"
app.get('/', (req, res) => {
    res.send('Gaiteiro é um bosta');
});
const crudUser = new CRUDUser(pool);

app.post ('/insersao', async (req, res) => {
    let data = req.body;

    // Cria uma instância de CRUDUser
    console.log("inserção");
    console.log(data);
    // console.log(data);
    // console.log(data.user);

    

    try {
        if (data.users){
            console.log("entrou no if");
            try {
                // Agora usando a instância 'crudUser'
                const newUser = await crudUser.create(data.users);
                res.status(201).json(newUser);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});



// // Função para fazer uma consulta ao banco de dados
// async function getUsers() {
//   try {
//     const res = await pool.query('SELECT * FROM pessoa'); // Supondo que você tenha uma tabela 'users'
//     console.log(res.rows); // Imprime os resultados
//   } catch (err) {
//     console.error(err.message); // Captura e exibe erros
//   }
// }

// // Chamar a função
// getUsers();



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
