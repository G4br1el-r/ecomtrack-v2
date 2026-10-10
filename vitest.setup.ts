import "@testing-library/jest-dom/vitest";

Element.prototype.scrollIntoView = () => {};

document.elementFromPoint = () => null;

window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
});
