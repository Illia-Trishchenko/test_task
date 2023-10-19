import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import DashboardHeader from "./dashboard-header";
import { AuthService } from "@/services";
import { useRouter } from "next/navigation";

// Mock any dependencies that the component relies on.
jest.mock("../../../services", () => ({
  AuthService: {
    me: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock("next/navigation");
const pushMock = jest.fn();
useRouter.mockReturnValue({
  push: pushMock,
});

// Define a sample user for testing
const sampleUser = {
  username: "testuser",
};

it("renders DashboardHeader component", async () => {
  // Mock the AuthService.me() method to return a user
  AuthService.me.mockResolvedValue({ data: { username: "testuser" } });

  render(<DashboardHeader />);

  // Wait for the component to render and fetch user details
  await waitFor(() => {
    expect(screen.getByText("Welcome, testuser")).toBeInTheDocument();
  });

  // Find the "Logout" button and simulate a click event
  const logoutButton = screen.getByTestId("logout-button");
  fireEvent.click(logoutButton);

  // Wait for the logout function to be called
  await waitFor(() => {
    expect(AuthService.logout).toHaveBeenCalled();
  });

  // Ensure that useRouter.push is called with the correct path
  const useRouterPush = useRouter().push;
  expect(useRouterPush).toHaveBeenCalledWith("/authentication");
});