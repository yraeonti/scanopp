import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { transactions } from "@/constans/constants";
import { transactions_columns } from "./transactions-columns";
import { Transaction } from "@/types";

export const TransactionsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable
          data={transactions as Transaction[]}
          columns={transactions_columns}
          searchKey="transaction_name"
          isSearch={true}
        />
      </CardContent>
    </Card>
  );
};
