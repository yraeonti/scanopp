import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCustomAdd } from "../hooks/use-custom-add";

export const CustomAddSheet = () => {
  const { isOpen, onClose } = useCustomAdd();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Manually add your recent transactions to your transactions summary
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
