"use client";

import { Eye } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/animate-ui/components/radix/tooltip";
import { Button } from "@/components/ui/button";
import { usePipelineDetailStore } from "@/store/Modules/Catalogo/EsteiraCadastro/pipeline-detail-store";

export function ViewDetailButton({ productId, productName }: { productId: string; productName: string }) {
  const openDetail = usePipelineDetailStore((state) => state.openDetail);
  return (
    <div className="flex justify-end">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Ver detalhes de ${productName}`}
            onClick={() => openDetail(productId)}
          >
            <Eye aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Ver detalhes</TooltipContent>
      </Tooltip>
    </div>
  );
}
