import { create } from "zustand";

type PipelineDetailState = {
  productId: string | null;
  open: boolean;
  openDetail: (productId: string) => void;
  setOpen: (open: boolean) => void;
};

export const usePipelineDetailStore = create<PipelineDetailState>()((set) => ({
  productId: null,
  open: false,
  openDetail: (productId) => set({ productId, open: true }),
  setOpen: (open) => set({ open }),
}));
