export interface TransactionType {
  name: string;
  withdrawal: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  value: string;
  type: TransactionType;
}
