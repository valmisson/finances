export interface TransactionType {
  name: string;
  withdrawal: boolean;
}

export interface Transaction {
  name: string;
  date: string;
  value: string;
  type: TransactionType;
}
