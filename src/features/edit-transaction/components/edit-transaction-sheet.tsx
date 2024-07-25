import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEditTransaction } from "../hooks/use-edit-transaction";
import { EditTransactionForm } from "./edit-transaction-form";

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useEditTransaction();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Manually add your recent transactions to your transactions summary
          </SheetDescription>
        </SheetHeader>

        <EditTransactionForm />
      </SheetContent>
    </Sheet>
  );
};
