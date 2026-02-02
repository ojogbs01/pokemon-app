import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Navbar", () => {
	it("renders the logo image with correct alt text", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		expect(screen.getByAltText("Pokedex logo")).toBeInTheDocument();
	});
	it("renders the logo heading", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		expect(screen.getByText("Pokédex")).toBeInTheDocument();
	});

	it("renders the search input with correct placeholder", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
	});

	it("renders the search icon image", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		expect(screen.getByAltText("Search icon")).toBeInTheDocument();
	});

	it("renders the filter icon image", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		expect(screen.getByAltText("Filter icon")).toBeInTheDocument();
	});

	it("updates the search input value when typed into", () => {
		render(
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>,
		);
		const input = screen.getByPlaceholderText("Search Pokemon...");
		fireEvent.change(input, { target: { value: "pikachu" } });
		expect(input.value).toBe("pikachu");
	});

	//TO DO - Navigation test
});
