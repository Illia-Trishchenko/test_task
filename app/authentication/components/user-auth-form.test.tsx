
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import UserAuthForm from "./user-auth-form";
import { useRouter } from "next/navigation";
// Mock any dependencies that the component relies on.
jest.mock("next/navigation");
const pushMock = jest.fn();

useRouter.mockReturnValue({
  push: pushMock,
});

jest.mock("../../../services/AuthService", () => ({
  login: jest.fn(),
}));

it("renders UserAuthForm component", async () => {
  render(<UserAuthForm />);

  // Find form fields by their labels or other unique identifiers
  const usernameInput = screen.getByLabelText("Username");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByTestId("login-button");

  // Simulate user input in the form fields
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });

  // Mock a successful login response
  const mockAuthServiceLogin = require("../../../services/AuthService").login;
  mockAuthServiceLogin.mockResolvedValue({});

  // Submit the form
  fireEvent.click(submitButton);

  // Wait for the form submission and redirection to complete
  await waitFor(() => {
    expect(mockAuthServiceLogin).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });

  // Ensure that the router's push function was called with the correct path.
  expect(useRouter().push).toHaveBeenCalledWith("/dashboard");
});
