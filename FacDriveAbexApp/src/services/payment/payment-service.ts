import axios from 'axios';
import { GetPaymentHistoryInput } from './types/get-payment-history-input';
import { GetPaymentHistoryOutput } from './types/get-payment-history-output';

class PaymentService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async getPaymentHistory(userId: number): Promise<GetPaymentHistoryOutput[]> {
    const endpoint = '/debt';

    const response = await axios<GetPaymentHistoryInput[]>({
      method: 'get',
      url: this.apiNodeUrl + endpoint,
      // url: this.apiNodeUrl + endpoint + '/' + userId,
    });

    const payments = response.data;

    return payments.map(({ idrelationship, amount }) => {
      return { id: idrelationship, costRide: Number(amount) };
    });
  }

  async setPaymentStatus(statusId: number) {
    const endpoint = '/debt';

    await axios({
      method: 'delete',
      url: this.apiNodeUrl + endpoint,
      data: {
        idrelationship: statusId,
      },
    });
  }
}

export default new PaymentService();
