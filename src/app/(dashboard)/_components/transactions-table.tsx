import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { transactions_columns } from "./transactions-columns";
import { Transaction } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { isLoading, data, isError } = useGetTransactions();

  useEffect(() => {
    if (data && data?.length > 0) {
      setTransactions(data as Transaction[]);
    }
  }, [data]);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3>Recent Transactions</h3>
          <Button asChild variant="outline" size="sm">
            <Link href="/transactions">View All</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          data={transactions as Transaction[]}
          columns={transactions_columns}
          searchKey="transaction_name"
          loading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
