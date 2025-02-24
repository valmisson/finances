export interface TableHeader {
  text: string;
  value: string;
  sortable?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableItem {
  [key: string]: any;
}
