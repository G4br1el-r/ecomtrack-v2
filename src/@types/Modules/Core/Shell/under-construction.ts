export type BlueprintBlockKind = "text" | "button" | "kpi" | "chart" | "table";

export type BlueprintBlock = {
  id: string;
  kind: BlueprintBlockKind;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BlueprintPoint = {
  x: number;
  y: number;
};

export type BlueprintStep = BlueprintBlock & {
  times: number[];
  drawTimes: number[];
  selectTimes: number[];
};

export type BlueprintTimeline = {
  steps: BlueprintStep[];
  cursor: { x: number[]; y: number[]; times: number[] };
};

export type BlueprintTimelineOptions = {
  blocks: readonly BlueprintBlock[];
  buildStart: number;
  buildStep: number;
  fade: number;
  draw: number;
  holdEnd: number;
  cursorRest: BlueprintPoint;
  cursorAnchor: BlueprintPoint;
};
