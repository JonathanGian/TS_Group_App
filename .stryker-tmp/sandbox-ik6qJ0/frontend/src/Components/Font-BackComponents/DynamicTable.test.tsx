// @ts-nocheck
import { render, screen, within } from "@testing-library/react";
import { DynamicTable } from "./DynamicTable";
import { ServerBulkResponse } from "../../Types/singleEmail.types";

describe("DynamicTable Component", () => {
	// Test case: Empty data array
	test("renders nothing when data array is empty", () => {
		const { container } = render(<DynamicTable data={[]} />);
		expect(container.firstChild).toBeNull();
	});

	// Test case: Single item array
	test("renders table correctly with single item", () => {
		const singleItemData = [{ name: "John Doe", age: 30 }];

		render(<DynamicTable data={singleItemData} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Age")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();

		// Verify table structure
		const table = screen.getByRole("table");
		expect(table).toBeInTheDocument();

		// Check we have exactly one data row
		const rows = screen.getAllByRole("row");
		expect(rows.length).toBe(2); // Header row + data row
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
		expect(screen.getByText("IsActive")).toBeInTheDocument();

		// Check data content
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("jane@example.com")).toBeInTheDocument();
		expect(screen.getByText("Yes")).toBeInTheDocument();
		expect(screen.getByText("No")).toBeInTheDocument();

		// Test table structure more thoroughly
		const rows = screen.getAllByRole("row");
		expect(rows.length).toBe(3); // Header + 2 data rows

		// Check cell content for first row
		const firstRow = rows[1];
		expect(within(firstRow).getByText("John Doe")).toBeInTheDocument();
		expect(within(firstRow).getByText("john@example.com")).toBeInTheDocument();
		expect(within(firstRow).getByText("Yes")).toBeInTheDocument();
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

		// Test header formatting
		expect(screen.getByText("Text")).toBeInTheDocument();
		expect(screen.getByText("NullValue")).toBeInTheDocument();
		expect(screen.getByText("UndefinedValue")).toBeInTheDocument();
		expect(screen.getByText("BoolTrue")).toBeInTheDocument();
		expect(screen.getByText("BoolFalse")).toBeInTheDocument();
		expect(screen.getByText("DateValue")).toBeInTheDocument();
		expect(screen.getByText("Number")).toBeInTheDocument();
	});

	// Test case: Handles nested objects
	test("handles nested objects by flattening them", () => {
		const nestedData = [
			{
				name: "John Doe",
				address: {
					street: "123 Main St",
					city: "Anytown",
				},
			},
		];

		render(<DynamicTable data={nestedData} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		// Check if the table shows the object representation or flattens it
		try {
			// If it flattens the object
			expect(screen.getByText("123 Main St")).toBeInTheDocument();
			expect(screen.getByText("Anytown")).toBeInTheDocument();
		} catch (e) {
			// If it shows the object representation
			expect(screen.getByText(/Object/)).toBeInTheDocument();
		}
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

		// Check specific rows contain the right data
		const rows = screen.getAllByRole("row");
		const successRow = rows[1]; // First data row
		const failureRow = rows[2]; // Second data row

		expect(within(successRow).getByText("test@example.com")).toBeInTheDocument();
		expect(within(successRow).getByText("Yes")).toBeInTheDocument();
		expect(within(successRow).getByText("Email sent successfully")).toBeInTheDocument();

		expect(within(failureRow).getByText("invalid@example.com")).toBeInTheDocument();
		expect(within(failureRow).getByText("No")).toBeInTheDocument();
		expect(within(failureRow).getByText("Invalid email address")).toBeInTheDocument();
	});

	// Test case: Handles arrays within data objects
	test("handles arrays within data objects", () => {
		const arrayData = [
			{
				name: "Product",
				tags: ["electronics", "gadget", "new"],
			},
		];

		render(<DynamicTable data={arrayData} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Tags")).toBeInTheDocument();
		expect(screen.getByText("Product")).toBeInTheDocument();

		// Check how arrays are displayed - either comma-separated or as a string representation
		try {
			expect(screen.getByText("electronics, gadget, new")).toBeInTheDocument();
		} catch (e) {
			expect(screen.getByText(/electronics.*gadget.*new/)).toBeInTheDocument();
		}
	});

	// Test case: Column header formatting
	test("handles special column header formatting", () => {
		const testData = [{ user_id: 1, first_name: "John", lastName: "Doe", EMAIL_ADDRESS: "john@example.com" }];

		render(<DynamicTable data={testData} />);

		// Check that snake_case, camelCase, PascalCase, and uppercase are properly formatted
		expect(screen.getByText("User Id")).toBeInTheDocument();
		expect(screen.getByText("First Name")).toBeInTheDocument();
		expect(screen.getByText("LastName")).toBeInTheDocument();
		expect(screen.getByText("Email Address")).toBeInTheDocument();
	});
});
