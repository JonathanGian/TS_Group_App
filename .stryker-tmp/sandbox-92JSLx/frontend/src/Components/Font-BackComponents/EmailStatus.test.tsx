// @ts-nocheck
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EmailStatus from "./EmailStatus";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

// Mock DynamicTable component
jest.mock("./DynamicTable", () => ({
	DynamicTable: ({ data }: { data: any[] }) => <div data-testid="dynamic-table">{data.length} items</div>,
}));

// Mock localStorage
const mockLocalStorage = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value;
		},
		clear: () => {
			store = {};
		},
	};
})();

Object.defineProperty(window, "localStorage", {
	value: mockLocalStorage,
	writable: true,
});

describe("EmailStatus Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocalStorage.clear();
		// Set default token
		mockLocalStorage.setItem("token", "mock-token");

		// Silence console errors during tests
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("shows login required message when no token is present", () => {
		// Make sure token is not set
		mockLocalStorage.clear();

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		expect(screen.getByText(/please login to view email status/i)).toBeInTheDocument();
	});

	test("fetches and displays email data when token is present", async () => {
		const mockEmailData = [
			{ id: 1, email: "test@example.com", status: "sent" },
			{ id: 2, email: "another@example.com", status: "failed" },
		];

		// Make sure axios.get returns the right structure
		mockedAxios.get.mockResolvedValue({
			data: { success: true, emails: mockEmailData },
		});

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(mockedAxios.get).toHaveBeenCalledWith(
				expect.stringContaining("/api/emails/status"),
				expect.objectContaining({
					headers: { Authorization: expect.stringContaining("mock-token") },
				})
			);
		});

		// Check if the table contains our test data
		await waitFor(() => {
			expect(screen.getByTestId("dynamic-table")).toHaveTextContent("2 items");
		});
	});

	test("navigates back to dashboard when button is clicked", async () => {
		mockedAxios.get.mockResolvedValue({
			data: { success: true, emails: [] },
		});

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		// Find the button - make sure to use the exact text or a more specific selector
		await waitFor(() => {
			const backButton = screen.getByText(/back to dashboard/i) || screen.getByRole("button", { name: /back/i });
			fireEvent.click(backButton);
		});

		// Now check navigation was called correctly
		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/upload-emails");
		});
	});

	test("handles API error correctly", async () => {
		mockedAxios.get.mockRejectedValue(new Error("API Error"));

		render(
			<BrowserRouter>
				<EmailStatus />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith("Error fetching emails", expect.any(Error));
		});
	});
});
