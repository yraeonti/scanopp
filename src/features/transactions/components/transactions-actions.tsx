"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreVertical, Share, Trash } from "lucide-react";

import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { toast } from "sonner";

type TransactionsTableActionsProps = {
  transaction: Transaction;
};

export const TransactionsActions = ({
  transaction,
}: TransactionsTableActionsProps) => {
  const { mutateAsync: deleteTransaction } = useDeleteTransaction();

  const handleDeleteTransaction = () => {
    toast.loading("Deleting Transaction");
    deleteTransaction(transaction._id as string)
      .then(() => {
        toast.success("Transaction Deleted Successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete transaction");
      })
      .finally(() => {
        toast.dismiss();
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() =>
            navigator.clipboard.writeText(transaction.transaction_id)
          }
        >
          Copy Transaction Id
          <Copy className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Edit Transaction
          <Edit className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteTransaction}
          className="cursor-pointer flex items-center justify-between"
        >
          Delete Transaction
          <Trash className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Share Invoice
          <Share className="ml-2 w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
