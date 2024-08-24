<<<<<<< Updated upstream
const express = require('express');
const pool = require('./Banco/db');
const CRUDUser = require('./Cruds_DB/User_db');
=======
import express from 'express';
import pool from './Banco/db.js';
import Cruds from './Cruds_DB/Cruds.js';


// novo
>>>>>>> Stashed changes
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
        if (data.user){
            console.log("entrou no if");
            try {
                // Agora usando a instância 'crudUser'
                const newUser = await crudUser.create(data.user);
                res.status(201).json(newUser);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    }
    catch (error) {
<<<<<<< Updated upstream
        console.error(error);
=======
        res.status(500).json({ error: error.message });
    }

});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await cruds.crudUser.login(email, password);

        if (result.success) {
            res.status(200).json({ success: true, userId: result.userId });
        } else {
            res.status(401).json({ success: false, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Definindo a rota /validacoes/email/:email
app.get('/validations/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await cruds.crudUser.validateEmail(email); 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
>>>>>>> Stashed changes
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
