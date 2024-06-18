"use client";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { TransactionsTable } from "./_components/transactions-table";

export default function TransactionsPage() {
  const { isLoading, data, isError } = useGetTransactions();

  console.log(data);
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <TransactionsTable />
      </div>
    </section>
  );
}
