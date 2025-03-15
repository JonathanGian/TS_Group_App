// @ts-nocheck
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import UploadEmails from "./UploadEmails";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock Navigation component
jest.mock("../Navigation", () => {
	return function MockNavigation() {
		return <div data-testid="navigation-component">Navigation</div>;
	};
});

// Add this to your jest-setup.js
import { screen } from "@testing-library/react";

// Helper for file inputs
screen.getByAcceptance = (accept: string): HTMLElement => {
	return screen.getByRole("textbox", { name: /file/i });
};

describe("UploadEmails Component", () => {
	// Setup and teardown
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Test case: Renders form elements
	test("renders form elements correctly", () => {
		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		// Check that form elements are present
		expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();
		expect(screen.getByText("Upload")).toBeInTheDocument();
		expect(screen.getByTestId("navigation-component")).toBeInTheDocument();

		// Check file input
		const fileInput = screen.getByAcceptance(".txt, .csv");
		expect(fileInput).toBeInTheDocument();
	});

	// Test case: Handles email input
	test("handles email input correctly", async () => {
		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		const emailInput = screen.getByPlaceholderText("Enter email address");
		await userEvent.type(emailInput, "test@example.com");
		expect(emailInput).toHaveValue("test@example.com");
	});

	// Test case: Handles file selection
	test("handles file selection correctly", async () => {
		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		const fileInput = screen.getByAcceptance(".txt, .csv") as HTMLInputElement;

		// Create a mock file
		const file = new File(["email1@example.com\nemail2@example.com"], "emails.txt", {
			type: "text/plain",
		});

		// Simulate file selection
		await userEvent.upload(fileInput, file);

		expect(fileInput.files?.[0]).toBe(file);
	});

	// Test case: Submits single email
	test("submits single email correctly", async () => {
		mockedAxios.post.mockResolvedValueOnce({
			data: { success: true, message: "Email submitted successfully" },
		});

		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		// Enter an email
		const emailInput = screen.getByPlaceholderText("Enter email address");
		await userEvent.type(emailInput, "test@example.com");

		// Submit form
		const submitButton = screen.getByText("Upload");
		await userEvent.click(submitButton);

		// Check that API call was made correctly
		await waitFor(() => {
			expect(mockedAxios.post).toHaveBeenCalledWith(
				"http://localhost:5005/api/emails/add",
				expect.any(FormData),
				expect.any(Object)
			);
		});

		// Check success message is displayed
		expect(await screen.findByText("Email submitted successfully")).toBeInTheDocument();
	});

	// Test case: Submits file upload
	test("submits file upload correctly", async () => {
		mockedAxios.post.mockResolvedValueOnce({
			data: { success: true, message: "File processed successfully" },
		});

		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		const fileInput = screen.getByAcceptance(".txt, .csv") as HTMLInputElement;

		// Create a mock file
		const file = new File(["email1@example.com\nemail2@example.com"], "emails.txt", {
			type: "text/plain",
		});

		// Simulate file selection
		await userEvent.upload(fileInput, file);

		// Submit form
		const submitButton = screen.getByText("Upload");
		await userEvent.click(submitButton);

		// Check API call
		await waitFor(() => {
			expect(mockedAxios.post).toHaveBeenCalledWith(
				"http://localhost:5005/api/emails/add",
				expect.any(FormData),
				expect.any(Object)
			);

			// Get the FormData from the API call
			const formData = mockedAxios.post.mock.calls[0][1] as FormData;
			expect(formData.get("file")).toBe(file);
		});

		// Check success message
		expect(await screen.findByText("File processed successfully")).toBeInTheDocument();
	});

	// Test case: Handles API error
	test("handles API error correctly", async () => {
		mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		// Enter an email
		const emailInput = screen.getByPlaceholderText("Enter email address");
		await userEvent.type(emailInput, "test@example.com");

		// Submit form
		const submitButton = screen.getByText("Upload");
		await userEvent.click(submitButton);

		// Check error message
		expect(await screen.findByText(/error/i)).toBeInTheDocument();
	});

	// Test case: Handles unsuccessful API response
	test("handles unsuccessful API response", async () => {
		mockedAxios.post.mockResolvedValueOnce({
			data: { success: false, message: "Invalid email format" },
		});

		render(
			<BrowserRouter>
				<UploadEmails />
			</BrowserRouter>
		);

		// Enter an email
		const emailInput = screen.getByPlaceholderText("Enter email address");
		await userEvent.type(emailInput, "invalid-email");

		// Submit form
		const submitButton = screen.getByText("Upload");
		await userEvent.click(submitButton);

		// Check error message
		expect(await screen.findByText("Invalid email format")).toBeInTheDocument();
	});
});
