export type GetPaymentHistoryInput = {
  idUser: number;
  name: string;
  surname: string;
  userimage: string;
  debt: {
    iddebt: number;
    idrelationship: number;
    amount: string;
  }[];
};
