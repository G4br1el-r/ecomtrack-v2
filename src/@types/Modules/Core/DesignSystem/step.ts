export type StepStatus = "complete" | "current" | "upcoming";

export type Step = {
  id: string;
  title: string;
  description?: string;
};
