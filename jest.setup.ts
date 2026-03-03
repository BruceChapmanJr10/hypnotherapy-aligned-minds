/* ---------------- JEST GLOBAL SETUP ---------------- */
/* Runs before every test file */

import "@testing-library/jest-dom";
import React from "react";

/* ---------------- MOCK NEXT IMAGE ---------------- */
/* Prevents Next.js <Image /> crashes in tests */

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return React.createElement("img", props);
  },
}));

/* ---------------- MOCK NEXT LINK ---------------- */
/* Prevents routing context errors */

jest.mock("next/link", () => {
  return ({ children, href }: any) => {
    return React.createElement("a", { href }, children);
  };
});

/* ---------------- MOCK NEXT FONT ---------------- */
/* Prevents next/font runtime errors */

jest.mock("next/font/google", () => ({
  Sofia: () => ({
    className: "mock-font",
  }),
}));

/* ---------------- SILENCE CONSOLE WARNINGS ---------------- */
/* Keeps test output clean */

jest.spyOn(console, "error").mockImplementation(() => {});
jest.spyOn(console, "warn").mockImplementation(() => {});
