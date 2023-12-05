import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageSelector from "./LanguageSelector";

test("renders LanguageSelector component", () => {
  render(<LanguageSelector />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

const testLanguageSelection = (language: string) => {
  render(<LanguageSelector />);
  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(language));
  expect(screen.getByRole("button").textContent).toContain(language);
};

test("selects English language", () => {
  testLanguageSelection("English");
});

test("selects Spanish language", () => {
  testLanguageSelection("Spanish");
});

test("selects Turkish language", () => {
  testLanguageSelection("Turkish");
});

test("selects French language", () => {
  testLanguageSelection("French");
});
