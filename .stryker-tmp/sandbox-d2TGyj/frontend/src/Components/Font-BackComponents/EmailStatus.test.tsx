// @ts-nocheck
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import EmailStatus from "./EmailStatus";
import { BrowserRouter } from "react-router-dom";

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock DynamicTable component
jest.mock("./DynamicTable", () => ({
	DynamicTable: ({ data }: { data: any[] }) => <div data-testid="dynamic-table">{data.length} items</div>,
}));

// Mock Navigation component
jest.mock("../Navigation", () => {
	return function MockNavigation() {
		return <div data-testid="navigation-component">Navigation</div>;
	};
});

describe("EmailStatus Component", () => {
	// Setup and teardown
	beforeEach(() => {
		// Clear mocks
		jest.clearAllMocks();

		// Mock localStorage
		Storage.prototype.getItem = jest.fn((key) => {
			if (key === "token") {
				return "mock-token";
			}
			return null;
		});
	});

	afterEach(() => {
		// Restore localStorage mock
		jest.restoreAllMocks();
	});

	// Test case: Shows login required message when no token
	test("shows login required message when no token is present", () => {
		// Override the localStorage mock for this test
		Storage.prototype.getItem = jest.fn().mockReturnValue(null);

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		expect(screen.getByText("Please login to view email status.")).toBeInTheDocument();
		expect(screen.queryByTestId("dynamic-table")).not.toBeInTheDocument();
	});

	// Test case: Fetches and displays email data when token is present
	test("fetches and displays email data when token is present", async () => {
		const mockEmailData = [
			{ id: 1, email: "test@example.com", status: "sent" },
			{ id: 2, email: "another@example.com", status: "failed" },
		];

		mockedAxios.get.mockResolvedValueOnce({
			data: { success: true, emails: mockEmailData },
		});

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		// Wait for the API call to resolve
		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				"http://localhost:5005/api/emails/status",
				expect.objectContaining({
					headers: { Authorization: "Bearer mock-token" },
				})
			);
		});

		// Check that the table is rendered with the correct data
		await waitFor(() => {
			expect(screen.getByTestId("dynamic-table")).toHaveTextContent("2 items");
		});
	});

	// Test case: Handles API error
	test("handles API error correctly", async () => {
		// Mock console.error to prevent test output clutter
		jest.spyOn(console, "error").mockImplementation(() => {});

		mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith("Error fetching emails", expect.any(Error));
		});

		// Table should still be rendered but with empty data
		expect(screen.getByTestId("dynamic-table")).toHaveTextContent("0 items");
	});

	// Test case: Handles unsuccessful API response
	test("handles unsuccessful API response", async () => {
		// Mock console.error to prevent test output clutter
		jest.spyOn(console, "error").mockImplementation(() => {});

		mockedAxios.get.mockResolvedValueOnce({
			data: { success: false, message: "Authentication failed" },
		});

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith("Failed to fetch emails", "Authentication failed");
		});
	});

	// Test case: Navigates back to dashboard when button is clicked
	test("navigates back to dashboard when button is clicked", async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: { success: true, emails: [] },
		});

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		// Find and click the "Back to Dashboard" button
		const backButton = await screen.findByText("Back to Dashboard");
		userEvent.click(backButton);

		// Check that navigation was called with correct path
		expect(mockNavigate).toHaveBeenCalledWith("/upload-emails");
	});
});
