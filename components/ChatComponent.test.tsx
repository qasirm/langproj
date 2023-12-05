import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "./ChatComponent";

test("renders Chat component", () => {
  render(<Chat lessonId="1" />);
  expect(screen.getByText("Chat with me!")).toBeInTheDocument();
});

test("allows entering text in input", () => {
  render(<Chat lessonId="1" />);
  const input = screen.getByPlaceholderText(
    "Type your message"
  ) as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Test message" } });
  expect(input.value).toBe("Test message");
});

test("contains Send button", () => {
  render(<Chat lessonId="1" />);
  expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
});
