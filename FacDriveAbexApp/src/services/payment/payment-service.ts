import axios from 'axios';
import { GetPaymentHistoryInput } from './types/get-payment-history-input';
import { GetPaymentHistoryOutput } from './types/get-payment-history-output';

class PaymentService {
    protected apiNodeUrl = process.env.API_NODE_URL;

    async getPaymentHistory(userId?: number): Promise<GetPaymentHistoryOutput[]> {
        const endpoint = '/debt';

        const response = await axios<GetPaymentHistoryInput[]>({
            method: 'get',
            url: `${this.apiNodeUrl}${endpoint}/${userId}`,
        });

        const { data } = response;

        if (!data || !Array.isArray(data)) {
            return [];
        }

        return data.flatMap(item => {
            if (!item.debt || !Array.isArray(item.debt) || item.debt.length === 0) {
                return [];
            }

            return item.debt
                .map(debtItem => {
                    if (!debtItem.idrelationship || !debtItem.amount) {
                        return null;
                    }

                    return {
                        id: debtItem.idrelationship,
                        name: `${item.name} ${item.surname}`.trim(),
                        amount: debtItem.amount,
                        image: item.userimage || '',
                    };
                })
                .filter((debtItem): debtItem is GetPaymentHistoryOutput => debtItem !== null);
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
