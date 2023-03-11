export interface TableHeader {
  text: string;
  value: string;
  sortable?: boolean;
}

export interface TableItem {
  [key: string]: any;
}
