import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContactForm } from "../ContactForm";

// Mock @base-ui/react/input to render a plain input
vi.mock("@base-ui/react/input", () => ({
  Input: (props: React.ComponentProps<"input">) => <input {...props} />,
}));

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Which brand are you interested in?")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tell us about your vision...")
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);

    const button = screen.getByRole("button", { name: /send inquiry/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("has required fields for name and email", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Your Name")).toBeRequired();
    expect(screen.getByPlaceholderText("Email Address")).toBeRequired();
  });

  it("email field has email type", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Email Address")).toHaveAttribute(
      "type",
      "email"
    );
  });

  it("allows typing in form fields", () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");
  });
});
