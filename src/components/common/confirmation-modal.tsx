"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  message = "Do you want to proceed with this action?",
  confirmText = "Agree",
  cancelText = "Disagree",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      {/*<DialogTrigger>Open</DialogTrigger>*/}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="outline">
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
