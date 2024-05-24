// types.ts
export interface Transaction {
  id: any;
  transaction_name: string;
  amount: number;
  status: "pending" | "failed" | "successful";
  category: "debit" | "credit";
  date: string; // Assuming date is in ISO format (e.g., '2024-05-20')
  benefactor: string;
}
