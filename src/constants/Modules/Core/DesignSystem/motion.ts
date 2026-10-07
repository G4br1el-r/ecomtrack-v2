export const DURATION_FAST = 0.15;
export const DURATION_BASE = 0.2;
export const DURATION_SLOW = 0.3;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 35, mass: 0.6 } as const;
export const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 30 } as const;
export const SPRING_NUMBER = { stiffness: 120, damping: 20, mass: 0.8 } as const;

export const STAGGER_CHILDREN = 0.04;
export const ENTER_OFFSET_Y = 4;
export const SLIDE_OFFSET_Y = 12;
export const POP_SCALE = 0.92;
export const DRAG_SCALE = 1.01;
export const ICON_ROTATION_DEGREES = 90;

export const LOOP_EASE = "easeInOut" as const;
export const REVEAL_STAGGER_SECONDS = 0.08;
export const REVEAL_TWEEN = { duration: 0.5, ease: EASE_OUT } as const;
export const FLOAT_OFFSET_Y = 6;
export const FLOAT_DURATION_SECONDS = 4;
export const TILT_FACTOR_DEGREES = 14;
export const TILT_PERSPECTIVE = 1200;
