"use client";
import { useMountedState } from "react-use";
import { UploadImageSheet } from "@/features/upload-image/components/upload-image-sheet";
import { CustomAddSheet } from "@/features/custom/components/custom-add-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <UploadImageSheet />
      <CustomAddSheet />
    </>
  );
};
