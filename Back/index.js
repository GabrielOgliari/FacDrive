import express from 'express';
import pool from './Banco/db.js';
import Cruds from './Cruds_DB/Cruds.js';

const app = express();
app.use(express.json())
const port = 3000;

const cruds = new Cruds(pool); // Instância de CRUDUser

// Endpoint básico que retorna "Hello, World!"
app.get('/', (req, res) => {
    res.send('Gaiteiro é um bosta');
});


app.post ('/insersao', async (req, res) => {
    let data = req.body;
    let newVehicle;

    console.log("inserção");
    // console.log(data);
    // console.log(data.user);

    try{
        const newUser = await cruds.crudUser.create(data.user);


        if (data.vehicle){
            newVehicle = await cruds.crudVehicle.create(data.vehicle,newUser.iduser);
        }
        

        res.status(201).json({ newVehicle, newUser });
        }
    catch (error) {
        res.status(500).json({ error: error.message });
    }


    

    // try {
    //     if (data.user){
    //         console.log("entrou no if");
    //         try {
    //             // Agora usando a instância 'crudUser'
    //             const newUser = await crudUser.create(data.user);
    //             res.status(201).json(newUser);
    //         } catch (error) {
    //             res.status(500).json({ error: error.message });
    //         }
    //     }
    // }
    // catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
