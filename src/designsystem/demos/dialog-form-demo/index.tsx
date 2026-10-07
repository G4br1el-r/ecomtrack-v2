"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";
import { Button } from "@/components/ui/button";

import { BrandFormDemo } from "../brand-form-demo";

export function DialogFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus data-icon="inline-start" aria-hidden="true" />
          Nova marca
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova marca</DialogTitle>
          <DialogDescription>Cadastre a marca para vincular aos produtos.</DialogDescription>
        </DialogHeader>
        <BrandFormDemo onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
