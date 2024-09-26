import bodyParser from "body-parser";
import express from "express";
import pool from "./Banco/db.js";
import Cruds from "./Cruds_DB/Cruds.js";

// novo

const app = express();
// app.use(express.json());
const port = 3000;

// Aumentar o limite para JSON bodies
app.use(bodyParser.json({ limit: "10mb" }));

// Aumentar o limite para URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());

const cruds = new Cruds(pool); // Instância de CRUDUser

// Endpoint básico que retorna "Hello, World!"
app.get("/", (req, res) => {
  res.send("API no ar!");
});

//gaiteiro pedio para ajustarcpara / register e não /cadastro
app.post("/register", async (req, res) => {
  let data = req.body;
  let newVehicle;

  // console.log("cadastro");
  // console.log(data);
  // console.log(data.address);

  try {
    const newUser = await cruds.crudUser.create(data.user);
    console.log(newUser);
    const newAddress = await cruds.crudAddress.create(
      data.address,
      newUser.iduser
    );

    if (data.vehicle) {
      newVehicle = await cruds.crudVehicle.create(data.vehicle, newUser.iduser);
    }

    res.status(201).json({ newVehicle, newUser, newAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
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
app.get("/validations/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await cruds.crudUser.validateEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Definindo a rota /validacoes/cpf/:cpf
app.get("/validations/cpf/:cpf", async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const user = await cruds.crudUser.validateCpf(cpf);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Definindo a rota /validacoes/placa/:placa
app.get("/validations/plate/:plate", async (req, res) => {
  try {
    const plate = req.params.plate;
    const vehicle = await cruds.crudVehicle.validatePlate(plate);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/image/:idUser", async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const result = await cruds.crudUser.read_userImage(idUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/image", async (req, res) => {
  let data = req.body;

  // console.log(data)

  try {
    const result = await cruds.crudUser.post_userImage(data);
    res.status(201).json({ result, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await cruds.crudUser.read(id);
    const endereco = await cruds.crudAddress.read(id);
    const veiculo = await cruds.crudVehicle.read(id);
    const result = { usuario, endereco, veiculo };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de class day
app.post("/classdays", async (req, res) => {
  try {
    const data = req.body;
    const result = await cruds.crudClassDay.create(data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar um novo dia da semana:", error);
    res.status(500).json({ error: "Erro ao criar um novo dia da semana" });
  }
});

// listar por ID do usuário
app.get("/classdays/id/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const classDays = await cruds.crudClassDay.read(userId);

    if (!classDays) {
      return res.status(404).json({ error: "Dias da semana não encontrados" });
    }

    res.status(200).json(classDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// listar dias próximos
app.get("/classdays/nearby/:user", async (req, res) => {
  try {
    const userId = req.params.user;
    // Buscar os dias próximos
    const nearbyDays = await cruds.crudClassDay.readNearbyDays(userId);

    if (!nearbyDays) {
      return res.status(404).json({ error: "Nenhum registro encontrado" });
    }

    res.status(200).json(nearbyDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar os dias da semana de um usuário específico

app.put('/classdays/:user', async (req, res) => {
  const userId = req.params.user;
  const data = req.body;

  try {
      const updatedClassDay = await cruds.crudClassDay.update(userId, data);
      res.status(200).json(updatedClassDay);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// rota para criar um novo relacionamento
app.post("/relationship", async (req, res) => {
  try {
    const { driverId, riderId, amount } = req.body;

    // Verificar se os valores estão definidos
    if (driverId == null || riderId == null || amount == null) {
      return res
        .status(400)
        .json({ error: "driverId, riderId e amount são obrigatórios" });
    }

    const newRelationship = await cruds.crudRelationship.create({
      driverId,
      riderId,
      amount,
    });
    res.status(201).json(newRelationship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Rota para ler relacionamentos
app.get("/relationship/:id?", async (req, res) => {
  try {
    const relationships = await crudRelationship.read(req.params.id);
    res.status(200).json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rota para listar relacionamentos de um usuário
app.get("/relationships/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const relationships = await cruds.crudRelationship.listByUser(userId);
    res.status(200).json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rota para atualizar um relacionamento
app.put("/relationship/:id", async (req, res) => {
  const relationshipId = req.params.id;
  const { amount } = req.body;

  try {
    const updatedRelationship = await cruds.crudRelationship.update(
      relationshipId,
      { amount }
    );
    res.status(200).json(updatedRelationship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rota para zerar o valor de amount de um relacionamento
app.put("/relationship/:id/reset-amount", async (req, res) => {
  const relationshipId = req.params.id;

  try {
    const updatedRelationship = await cruds.crudRelationship.update(
      relationshipId,
      { amount: 0 }
    );
    res.status(200).json(updatedRelationship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Rota para deletar um relacionamento.
app.delete("/relationship/:id", async (req, res) => {
  try {
    const deletedRelationship = await cruds.crudRelationship.delete(
      req.params.id
    );
    res.status(200).json(deletedRelationship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/debt', async (req, res) => {
    try {
        const result = await cruds.crudDebt.listDebts();
        //const adicionar = await cruds.crudDebt.addDebt();
        //res.status(200).json(adicionar);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/debt', async (req, res) => {
    try{
        const { idrelationship } = req.body;
        const result = await cruds.crudDebt.markAsPaid(idrelationship);
        res.status(201).json(result);
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
