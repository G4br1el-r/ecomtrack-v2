"use client";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { Button } from "@/components/ui/button";
import { ACCOUNT_SECURITY_HREF, PIN_SETTINGS } from "@/constants/Modules/Core/Conta/account";
import { useSecurityPinStore } from "@/store/Modules/Core/Access/security-pin-store";

import { SecurityPinForm } from "../security-pin-form";

export function SecurityPinDialog() {
  const prompt = useSecurityPinStore((state) => state.prompt);
  const answer = useSecurityPinStore((state) => state.answer);
  const settings = prompt ? PIN_SETTINGS[prompt.type] : null;
  const missing = prompt?.mode === "missing";

  return (
    <Dialog
      open={prompt !== null}
      onOpenChange={(next) => {
        if (!next) answer(null);
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{missing ? `Crie o seu ${settings?.title}` : `Informe o seu ${settings?.title}`}</DialogTitle>
          <DialogDescription>
            {missing
              ? "Esta área é protegida por PIN e você ainda não criou o seu. Crie em Minha conta > Segurança."
              : settings?.description}
          </DialogDescription>
        </DialogHeader>
        {prompt && !missing ? (
          <SecurityPinForm
            key={`${prompt.type}-${prompt.mode}`}
            type={prompt.type}
            invalid={prompt.mode === "invalid"}
            onSubmit={answer}
            onCancel={() => answer(null)}
          />
        ) : (
          <DialogFooter>
            <Button variant="ghost" onClick={() => answer(null)}>
              Agora não
            </Button>
            <Button asChild onClick={() => answer(null)}>
              <Link href={ACCOUNT_SECURITY_HREF}>Criar PIN</Link>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
