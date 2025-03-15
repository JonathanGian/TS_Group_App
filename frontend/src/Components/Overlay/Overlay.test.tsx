import { render, screen } from "@testing-library/react";
import Overlay from "./Overlay";

describe("Overlay", () => {
	test("renders overlay text", () => {
		render(<Overlay />);
		const overlayElement = screen.getByText("Overlay");
		expect(overlayElement).toBeInTheDocument();
	});
});
