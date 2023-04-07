export interface TransactionType {
  name: string;
  value: string;
  withdrawal: boolean;
}

export interface Transaction {
  id?: string;
  name: string;
  date: string;
  value: number;
  type: TransactionType;
}
