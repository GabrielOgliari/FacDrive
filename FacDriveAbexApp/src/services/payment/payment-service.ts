import axios from 'axios';
import { GetPaymentHistoryResponse } from './types/get-payment-history-response';

class PaymentService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async getPaymentHistory(userId: number): Promise<GetPaymentHistoryResponse> {
    const endpoint = '/';

    const response = await axios({
      method: 'get',
      url: this.apiNodeUrl + endpoint + '/' + userId,
    });

    return response.data;
  }

  async setPaymentStatus(statusId: number) {
    const endpoint = '/';

    await axios({
      method: 'post',
      url: this.apiNodeUrl + endpoint + '/' + statusId,
    });
  }
}

export default new PaymentService();
