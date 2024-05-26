import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUploadImage } from "@/features/upload-image/hooks/use-upload-image";
import { useState } from "react";
import { ImageCapture } from "./web-cam";

export const UploadImageSheet = () => {
  const { isOpen, onClose } = useUploadImage();
  const [isWebCam, setIsWebCam] = useState(false);
  const [isFile, setIsFile] = useState(false);
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
        <ImageCapture />
      </SheetContent>
    </Sheet>
  );
};
