import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUploadImage } from "@/features/upload-image/hooks/use-upload-image";

export const UploadImageSheet = () => {
  const { isOpen, onClose } = useUploadImage();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Upload Image(jpeg, png)</SheetTitle>
          <SheetDescription>
            You can create or add to your transactions summary by either
            uploading or taking a capture of your recent receipt
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
