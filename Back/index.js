import express from 'express';
import bodyParser from 'body-parser';
import pool from './Banco/db.js';
import Cruds from './Cruds_DB/Cruds.js';

// novo

const app = express();
// app.use(express.json());
const port = 3000;

// Aumentar o limite para JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));

// Aumentar o limite para URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

const cruds = new Cruds(pool); // Instância de CRUDUser

// Endpoint básico que retorna "Hello, World!"
app.get('/', (req, res) => {
    res.send('Gaiteiro é um bosta');
});

//gaiteiro pedio para ajustarcpara / register e não /cadastro
app.post ('/register', async (req, res) => {
    let data = req.body;
    let newVehicle;

    // console.log("cadastro");
    // console.log(data);
    // console.log(data.address);

    try{
        const newUser = await cruds.crudUser.create(data.user);
        console.log(newUser);
        const newAddress = await cruds.crudAddress.create(data.address,newUser.iduser);


        if (data.vehicle){
            newVehicle = await cruds.crudVehicle.create(data.vehicle,newUser.iduser);
        }
        

        res.status(201).json({ newVehicle, newUser, newAddress });
        }
    catch (error) {
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
    }
});

// Definindo a rota /validacoes/cpf/:cpf
app.get('/validations/cpf/:cpf', async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const user = await cruds.crudUser.validateCpf(cpf); 
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Definindo a rota /validacoes/placa/:placa
app.get('/validations/plate/:plate', async (req, res) => {
    try {
        const plate = req.params.plate;
        const vehicle = await cruds.crudVehicle.validatePlate(plate); 
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/image/:idUser', async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const result = await cruds.crudUser.read_userImage(idUser);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/image', async (req, res) => {
    let data = req.body

    // console.log(data)

    try{
        const result = await cruds.crudUser.post_userImage(data)
        res.status(201).json({result, success: true});

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }


});



app.get('/cleam', async (req, res) => {
    try {
        const result = await cruds.limpeza.limpeza();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
