import { describe, expect, it } from "vitest";

import { isScrolledToEnd } from "./is-scrolled-to-end";

const CLIENT_HEIGHT = 600;
const SCROLL_HEIGHT = 1000;

describe("isScrolledToEnd", () => {
  it("considera no fim quando não há rolagem", () => {
    expect(isScrolledToEnd({ scrollTop: 0, scrollHeight: CLIENT_HEIGHT, clientHeight: CLIENT_HEIGHT })).toBe(true);
  });

  it("não está no fim no topo de uma lista longa", () => {
    expect(isScrolledToEnd({ scrollTop: 0, scrollHeight: SCROLL_HEIGHT, clientHeight: CLIENT_HEIGHT })).toBe(false);
  });

  it("está no fim ao rolar até o final", () => {
    expect(isScrolledToEnd({ scrollTop: 400, scrollHeight: SCROLL_HEIGHT, clientHeight: CLIENT_HEIGHT })).toBe(true);
  });

  it("tolera a margem de arredondamento perto do fim", () => {
    expect(isScrolledToEnd({ scrollTop: 397, scrollHeight: SCROLL_HEIGHT, clientHeight: CLIENT_HEIGHT })).toBe(true);
  });
});
