// @ts-nocheck
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

describe("Navigation Component", () => {
	beforeEach(() => {
		// Reset mocks before each test
		mockNavigate.mockReset();
	});

	test("renders AppBar with menu button", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();
		expect(screen.getByText(/Group App/i)).toBeInTheDocument();
	});

	test("drawer is initially closed", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Check that navigation items are not visible initially
		expect(screen.queryByText("Home")).not.toBeVisible();
	});

	test("opens drawer when menu button is clicked", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Click the menu button
		fireEvent.click(screen.getByLabelText(/menu/i));

		// Check that navigation items are now visible
		expect(screen.getByText("Home")).toBeVisible();
		expect(screen.getByText("Upload Emails")).toBeVisible();
		expect(screen.getByText("EmailStatus")).toBeVisible();
	});

	test("navigates to home page when Home is clicked", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Open the drawer first
		fireEvent.click(screen.getByLabelText(/menu/i));

		// Click on Home navigation item
		fireEvent.click(screen.getByText("Home"));

		// Check that we navigated to the home page
		expect(mockNavigate).toHaveBeenCalledWith("/");
	});

	test("navigates to upload-emails page when Upload Emails is clicked", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Open the drawer first
		fireEvent.click(screen.getByLabelText(/menu/i));

		// Click on Upload Emails navigation item
		fireEvent.click(screen.getByText("Upload Emails"));

		// Check that we navigated to the upload-emails page
		expect(mockNavigate).toHaveBeenCalledWith("/upload-emails");
	});

	test("navigates to status page when EmailStatus is clicked", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Open the drawer first
		fireEvent.click(screen.getByLabelText(/menu/i));

		// Click on EmailStatus navigation item
		fireEvent.click(screen.getByText("EmailStatus"));

		// Check that we navigated to the status page
		expect(mockNavigate).toHaveBeenCalledWith("/status");
	});

	test("closes drawer when clicking outside", () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		// Open the drawer first
		fireEvent.click(screen.getByLabelText(/menu/i));

		// Verify drawer is open
		expect(screen.getByText("Home")).toBeVisible();

		// Click outside (backdrop)
		fireEvent.click(document.querySelector(".MuiBackdrop-root"));

		// Verify drawer is closed
		expect(screen.queryByText("Home")).not.toBeVisible();
	});
});
