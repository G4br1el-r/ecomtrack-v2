export type Hotkey = {
  key: string;
  mod?: boolean;
};

export type HotkeyEvent = {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
};
