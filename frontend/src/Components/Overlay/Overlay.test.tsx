import { render, screen } from "@testing-library/react";
import Overlay from "./Overlay";

describe("Overlay", () => {
	test("renders overlay text", () => {
		render(<Overlay />);
		const overlayElement = screen.getByText("Overlay");
		expect(overlayElement).toBeInTheDocument();
	});

	test("renders with correct CSS class", () => {
		const { container } = render(<Overlay />);
		const overlayDiv = container.querySelector("div");
		expect(overlayDiv).toHaveClass("overlay");
	});

	test("contains a paragraph element", () => {
		render(<Overlay />);
		const paragraphElement = screen.getByText("Overlay");
		expect(paragraphElement.tagName).toBe("P");
	});
});
