import { describe, expect, it } from "vitest";

import { DEFAULT_DENSITY } from "@/constants/Modules/Core/DesignSystem/density";

import { parseDensity } from "./parse-density";

describe("parseDensity", () => {
  it.each(["comfortable", "compact"])("aceita %s", (value) => {
    expect(parseDensity(value)).toBe(value);
  });

  it.each([null, undefined, "", "dense", 1])("usa o padrão para %j", (value) => {
    expect(parseDensity(value)).toBe(DEFAULT_DENSITY);
  });
});
