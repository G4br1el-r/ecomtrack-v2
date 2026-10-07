import "@testing-library/jest-dom/vitest";

Element.prototype.scrollIntoView = () => {};

document.elementFromPoint = () => null;
