import type { BlueprintBlock, BlueprintPoint } from "@/@types/Modules/Core/Shell/under-construction";

export const CONSTRUCTION_CYCLE_SECONDS = 10;
export const CONSTRUCTION_BUILD_START = 0.06;
export const CONSTRUCTION_BUILD_STEP = 0.085;
export const CONSTRUCTION_FADE = 0.03;
export const CONSTRUCTION_DRAW = 0.12;
export const CONSTRUCTION_HOLD_END = 0.94;

export const CONSTRUCTION_BLOCK_HIDDEN_SCALE_X = 0;

export const CONSTRUCTION_BLUEPRINT_VIEWBOX = "0 0 480 300";
export const CONSTRUCTION_CURSOR_REST: BlueprintPoint = { x: 320, y: 254 };
export const CONSTRUCTION_CURSOR_ANCHOR: BlueprintPoint = { x: 0.3, y: 0.55 };
export const CONSTRUCTION_CURSOR_PATH = "M0 0 L0 17 L4.6 12.6 L7.6 19.4 L10.4 18.2 L7.4 11.6 L13.6 11.6 Z";
export const CONSTRUCTION_CHART_PATH = "M12 58 C 50 50, 76 22, 116 30 S 180 54, 220 38 S 290 14, 328 18";

export const CONSTRUCTION_SIDEBAR_BARS = [
  { id: "nav-1", y: 80, width: 64 },
  { id: "nav-2", y: 98, width: 48 },
  { id: "nav-3", y: 116, width: 58 },
  { id: "nav-4", y: 134, width: 42 },
  { id: "nav-5", y: 152, width: 54 },
] as const;

export const CONSTRUCTION_TABLE_ROWS = [
  { id: "row-1", y: 17 },
  { id: "row-2", y: 30 },
  { id: "row-3", y: 43 },
] as const;

export const CONSTRUCTION_BLUEPRINT_BLOCKS: readonly BlueprintBlock[] = [
  { id: "title", kind: "text", x: 120, y: 46, width: 160, height: 16 },
  { id: "action", kind: "button", x: 388, y: 42, width: 72, height: 24 },
  { id: "kpi-orders", kind: "kpi", x: 120, y: 80, width: 106, height: 56 },
  { id: "kpi-revenue", kind: "kpi", x: 237, y: 80, width: 106, height: 56 },
  { id: "kpi-ticket", kind: "kpi", x: 354, y: 80, width: 106, height: 56 },
  { id: "chart", kind: "chart", x: 120, y: 148, width: 340, height: 72 },
  { id: "table", kind: "table", x: 120, y: 232, width: 340, height: 54 },
];

export const CONSTRUCTION_BLOCK_PADDING = 12;

export const CONSTRUCTION_SELECTION_INSET = 3;
export const CONSTRUCTION_SELECTION_HANDLE_SIZE = 5;

export const CONSTRUCTION_CURSOR_LABEL_X = 14;
export const CONSTRUCTION_CURSOR_LABEL_Y = 16;
export const CONSTRUCTION_CURSOR_LABEL_WIDTH = 132;
export const CONSTRUCTION_CURSOR_LABEL_HEIGHT = 32;
