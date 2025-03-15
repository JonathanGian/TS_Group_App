// @ts-nocheck
import { render, screen } from "@testing-library/react";
import { DynamicTable } from "./DynamicTable";
import { ServerBulkResponse } from "../../Types/singleEmail.types";

describe("DynamicTable Component", () => {
	// Test case: Empty data array
	test("renders nothing when data array is empty", () => {
		const { container } = render(<DynamicTable data={[]} />);
		expect(container.firstChild).toBeNull();
	});

	// Test case: Renders headers and data correctly
	test("renders table with data correctly", () => {
		const testData = [
			{ name: "John Doe", email: "john@example.com", isActive: true },
			{ name: "Jane Smith", email: "jane@example.com", isActive: false },
		];

		render(<DynamicTable data={testData} />);

		// Check headers (capitalized and formatted)
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("Is Active")).toBeInTheDocument();

		// Check data content
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("jane@example.com")).toBeInTheDocument();
		expect(screen.getByText("Yes")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();
	});

	// Test case: Formats values correctly based on type
	test("formats different value types correctly", () => {
		const date = new Date("2023-01-01T12:00:00");
		const testData = [
			{
				text: "Regular text",
				nullValue: null,
				undefinedValue: undefined,
				boolTrue: true,
				boolFalse: false,
				dateValue: date,
				number: 42,
			},
		];

		render(<DynamicTable data={testData} />);

		expect(screen.getByText("Regular text")).toBeInTheDocument();
		expect(screen.getAllByText("-").length).toBe(2); // null and undefined values
		expect(screen.getByText("Yes")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();

		// Date formatting might differ based on the locale settings, so we'll check
		// that some representation of the date exists
		const dateString = date.toLocaleString();
		expect(screen.getByText(dateString)).toBeInTheDocument();
	});

	// Test case: Handles ServerBulkResponse data type
	test("renders ServerBulkResponse data correctly", () => {
		const bulkResponseData: ServerBulkResponse[] = [
			{
				email: "test@example.com",
				success: true,
				message: "Email sent successfully",
			},
			{
				email: "invalid@example.com",
				success: false,
				message: "Invalid email address",
			},
		];

		render(<DynamicTable data={bulkResponseData} />);

		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("Success")).toBeInTheDocument();
		expect(screen.getByText("Message")).toBeInTheDocument();

		expect(screen.getByText("test@example.com")).toBeInTheDocument();
		expect(screen.getByText("Email sent successfully")).toBeInTheDocument();
		expect(screen.getByText("Invalid email address")).toBeInTheDocument();
		expect(screen.getAllByText("Yes").length).toBeGreaterThanOrEqual(1);
		expect(screen.getAllByText("No").length).toBeGreaterThanOrEqual(1);
	});
});
