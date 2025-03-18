import { render, screen } from "@testing-library/react";
import TestingExampleComponent from "./TestingExampleComponent";

describe("TestingExampleComponent", () => {
	it("renders without crashing", () => {
		render(<TestingExampleComponent />);
	});

	it("displays the correct sum result", () => {
		render(<TestingExampleComponent />);
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("has a div with className 'result'", () => {
		const { container } = render(<TestingExampleComponent />);
		const resultDiv = container.querySelector(".result");
		expect(resultDiv).toBeInTheDocument();
	});

	it("contains a paragraph element", () => {
		render(<TestingExampleComponent />);
		const paragraphElement = screen.getByText("3");
		expect(paragraphElement.tagName).toBe("P");
	});
});
