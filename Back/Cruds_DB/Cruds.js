import CRUDUser from './User_db.js'; // Ajuste o caminho conforme necessário
import CRUDVehicle from './vehicle_db.js'; // Ajuste o caminho conforme necessário
import CRUDAddress from './Address_db.js'; // Ajuste o caminho conforme necessário
import Limpeza from './limpeza.js'; // Ajuste o caminho conforme necessário

// Classe que contém todas as operações CRUD 
// sentraliza para a chamada de todas as operações 

class Cruds {
    constructor(pool) {
        this.pool = pool;
        this.crudUser = new CRUDUser(pool);
        this.crudVehicle = new CRUDVehicle(pool);
        this.crudAddress = new CRUDAddress(pool);



        this.limpeza = new Limpeza(pool);
    }
}

// module.exports = Cruds; // Exporta a classe para ser utilizada em outros arquivos
export default Cruds; 
