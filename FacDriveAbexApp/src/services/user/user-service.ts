import axios from 'axios';
import { GetUserDataInput } from './types/get-user-data-input';
import { GetUserDataOutput } from './types/get-user-data-output';

class UserService {
    protected apiNodeUrl = process.env.API_NODE_URL;

    async getData(id?: number): Promise<GetUserDataOutput> {
        const endpoint = '/user';

        const response = await axios<GetUserDataInput>({
            method: 'get',
            url: this.apiNodeUrl + endpoint + '/' + id,
        });

        const { data } = response;

        return {
            id: data.usuario.iduser,
            isDriver: data.usuario.isdriver,
            name: data.usuario.name,
        };
    }
}

export default new UserService();
