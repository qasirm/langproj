import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoteInput from "./NoteComponent";
import { toast } from "react-toastify";

// Mock react-toastify to avoid actual toasts
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

test("renders NoteInput component", () => {
  render(<NoteInput />);
  expect(
    screen.getByPlaceholderText("Type your note here...")
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Add Note" })).toBeInTheDocument();
});

test("allows entering text in textarea", () => {
  render(<NoteInput />);
  const textarea = screen.getByPlaceholderText(
    "Type your note here..."
  ) as HTMLTextAreaElement;
  fireEvent.change(textarea, { target: { value: "Test note" } });
  expect(textarea.value).toBe("Test note");
});

test("shows error when adding empty note", () => {
  render(<NoteInput />);
  fireEvent.click(screen.getByRole("button", { name: "Add Note" }));
  expect(toast.error).toHaveBeenCalledWith("Please enter a note.");
});

test("clears textarea after adding note", () => {
  render(<NoteInput />);
  const textarea = screen.getByPlaceholderText(
    "Type your note here..."
  ) as HTMLTextAreaElement;
  fireEvent.change(textarea, { target: { value: "Test note" } });
  fireEvent.click(screen.getByRole("button", { name: "Add Note" }));
  expect(textarea.value).toBe("");
});
