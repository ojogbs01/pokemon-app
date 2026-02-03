import Footer from "./Footer";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
	it("renders the my name name", () => {
		render(<Footer />);
		expect(screen.getByText("Stephen Ojogbede")).toBeInTheDocument();
	});

	it("renders the GitHub link with correct href", () => {
		render(<Footer />);
		const link = screen.getByRole("link", { name: /view code on github/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://github.com/ojogbs01/pokemon-app");
		expect(link).toHaveAttribute("target", "_blank");
	});

	it("renders the copyright", () => {
		render(<Footer />);
		expect(screen.getByText("© 2025 Pokédex. All rights reserved.")).toBeInTheDocument();
	});
});
