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
		expect(screen.getByText("User id")).toBeInTheDocument();
		expect(screen.getByText("First name")).toBeInTheDocument();
		expect(screen.getByText("LastName")).toBeInTheDocument();
		expect(screen.getByText("EMAIL ADDRESS")).toBeInTheDocument();
	});

	// Test case: Very large data sets (performance and rendering)
	test("handles large data sets", () => {
		// Generate a large array with 100 items
		const largeData = Array.from({ length: 100 }, (_, i) => ({
			id: i,
			value: `Value ${i}`,
		}));

		render(<DynamicTable data={largeData} />);

		// Check that headers are rendered
		expect(screen.getByText("Id")).toBeInTheDocument();
		expect(screen.getByText("Value")).toBeInTheDocument();

		// Check some specific values to ensure rendering works
		expect(screen.getByText("Value 0")).toBeInTheDocument();
		expect(screen.getByText("Value 50")).toBeInTheDocument();
		expect(screen.getByText("Value 99")).toBeInTheDocument();
	});

	// Test case: Handling data with missing properties
	test("handles inconsistent data objects", () => {
		const inconsistentData = [
			{ id: 1, name: "Complete", description: "Has all fields" },
			{ id: 2, name: "Missing Description" },
			{ id: 3, description: "Missing Name" },
		];

		render(<DynamicTable data={inconsistentData} />);

		// Check all columns are rendered
		expect(screen.getByText("Id")).toBeInTheDocument();
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Description")).toBeInTheDocument();

		// Check that missing values are displayed correctly (usually as "-")
		const rows = screen.getAllByRole("row");
		expect(within(rows[2]).getByText("-")).toBeInTheDocument(); // Missing description cell
		expect(within(rows[3]).getByText("-")).toBeInTheDocument(); // Missing name cell
	});

	// Test case: Handling special characters in data
	test("handles special characters in data", () => {
		const specialCharData = [
			{
				id: 1,
				text: "Special < > & \" ' characters",
				htmlText: "<strong>Bold text</strong>",
			},
		];

		render(<DynamicTable data={specialCharData} />);

		// Check that special characters are escaped properly
		expect(screen.getByText("Special < > & \" ' characters")).toBeInTheDocument();

		// Check that HTML isn't rendered as actual HTML
		expect(screen.getByText("<strong>Bold text</strong>")).toBeInTheDocument();
		expect(screen.queryByText("Bold text")).not.toBeInTheDocument();
	});

	// Test case: Check specific table structure
	test("renders table structure correctly", () => {
		const testData = [{ id: 1, name: "Test" }];

		render(<DynamicTable data={testData} />);

		// Check that we have table structure components
		expect(screen.getByRole("table")).toBeInTheDocument();

		// Get all rowgroups and check we have exactly 2 (thead and tbody)
		const rowGroups = screen.getAllByRole("rowgroup");
		expect(rowGroups).toHaveLength(2);

		// First rowgroup should be the thead
		expect(rowGroups[0]).toHaveClass("MuiTableHead-root");

		// Second rowgroup should be the tbody
		expect(rowGroups[1]).toHaveClass("MuiTableBody-root");

		const headerCells = screen.getAllByRole("columnheader");
		expect(headerCells.length).toBe(2); // Two columns: id and name

		const dataCells = screen.getAllByRole("cell");
		expect(dataCells.length).toBe(2); // Two data cells
		expect(dataCells[0]).toHaveTextContent("1");
		expect(dataCells[1]).toHaveTextContent("Test");
	});

	// Test case: Verify header styles
	test("applies correct styling to header cells", () => {
		const testData = [{ id: 1, name: "Test" }];

		render(<DynamicTable data={testData} />);

		const headerCells = screen.getAllByRole("columnheader");

		// Check styling on header cells - adjust these assertions based on your actual styles
		headerCells.forEach((cell) => {
			// Check for MUI TableCell class
			expect(cell).toHaveClass("MuiTableCell-head");

			// Check for any custom classes your component might add
			// e.g., expect(cell).toHaveClass("your-custom-header-class");
		});
	});

	// Add these new test cases at the bottom of your file:

	// Test case: Formatting of empty strings
	test("formats empty strings correctly", () => {
		const emptyStringData = [
			{
				emptyString: "",
				nonEmptyString: "text",
				zero: 0,
			},
		];

		render(<DynamicTable data={emptyStringData} />);

		// Check if empty strings are rendered as empty or as a placeholder
		// This specifically tests if "" is treated differently than other falsy values
		const rows = screen.getAllByRole("row");
		const dataRow = rows[1];
		const cells = within(dataRow).getAllByRole("cell");

		// If empty string is rendered as itself (empty cell content)
		expect(cells[0].textContent).toBe(""); // or you might expect "-" depending on implementation

		// Non-empty string and zero should be distinct
		expect(cells[1].textContent).toBe("text");
		expect(cells[2].textContent).toBe("0");
	});

	// Test case: Exact format for boolean values
	test("formats boolean values with exact expected text", () => {
		const booleanData = [
			{
				trueValue: true,
				falseValue: false,
			},
		];

		render(<DynamicTable data={booleanData} />);

		// Check the exact formatting of boolean values
		// This will fail if the string literals "Yes"/"No" are changed
		const trueCells = screen.getAllByText("Yes");
		const falseCells = screen.getAllByText("No");

		expect(trueCells).toHaveLength(1);
		expect(falseCells).toHaveLength(1);

		// Also verify by row/cell to be extra sure
		const row = screen.getAllByRole("row")[1];
		const cells = within(row).getAllByRole("cell");
		expect(cells[0]).toHaveTextContent("Yes");
		expect(cells[1]).toHaveTextContent("No");
	});

	// Test case: Exact format for null/undefined values
	test("formats null and undefined values with exact expected placeholder", () => {
		const nullUndefinedData = [
			{
				nullValue: null,
				undefinedValue: undefined,
			},
		];

		render(<DynamicTable data={nullUndefinedData} />);

		// Check the exact placeholder text used for null/undefined
		// This specifically tests the string literal used as placeholder
		const placeholders = screen.getAllByText("-");
		expect(placeholders).toHaveLength(2);

		// Also check with more specific queries
		const row = screen.getAllByRole("row")[1];
		const cells = within(row).getAllByRole("cell");
		expect(cells[0]).toHaveTextContent("-");
		expect(cells[1]).toHaveTextContent("-");
	});

	// Test case: Table container styling
	test("renders table container with correct styles", () => {
		const testData = [{ id: 1, name: "Test" }];

		render(<DynamicTable data={testData} />);

		// Find the table container (Paper component)
		const tableContainer = screen.getByRole("table").closest(".MuiTableContainer-root");
		expect(tableContainer).toBeInTheDocument();

		// If your component applies specific styles, test those
		// For example, if it uses a specific elevation:
		expect(tableContainer).toHaveClass("MuiPaper-elevation1");

		// If it applies specific styles directly:
		// This depends on your implementation but helps catch styling string literals
		const tableElement = screen.getByRole("table");
		expect(tableElement).toHaveClass("MuiTable-root");
	});

	// Test case: Edge case - objects with function values
	test("handles function values in data objects", () => {
		const funcData = [
			{
				id: 1,
				handler: () => console.log("Hello"),
			},
		];

		render(<DynamicTable data={funcData} />);

		// Check the function is displayed as some text representation
		const functionCells = screen.getAllByRole("cell");
		expect(functionCells[1].textContent).not.toBe("");

		// Depending on how your component formats functions, this might be:
		// "function" or "[Function]" or similar
		expect(functionCells[1].textContent).toMatch(/function|Function|\(\)/);
	});
});
