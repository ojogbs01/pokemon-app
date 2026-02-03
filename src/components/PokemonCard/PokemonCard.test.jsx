import PokemonCard from "./PokemonCard";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("PokemonCard", () => {
	it("renders the pokemon name", () => {
		render(<PokemonCard name="Bulbasaur" id={1} types={["Grass, Poison"]} />);
		expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
	});

	it("renders the pokemon ID", () => {
		render(<PokemonCard name="Bulbasaur" id={1} types={["Grass, Poison"]} />);
		expect(screen.getByText("#1")).toBeInTheDocument();
	});

	it("renders the pokemon sprite image", () => {
		render(<PokemonCard name="Bulbasaur" id={1} types={["Grass, Poison"]} />);
		const img = screen.getByAltText("Pokemon Sprite");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute(
			"src",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
		);
	});

	it("renders the pokemon types", () => {
		render(<PokemonCard name="Bulbasaur" id={1} types={["Grass, Poison"]} />);
		expect(screen.getByText(/Grass/i)).toBeInTheDocument();
		expect(screen.getByText(/Poison/i)).toBeInTheDocument();
	});

	it('shows "Loading..." if types prop is missing', () => {
		render(<PokemonCard name="Bulbasaur" id={1} />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});
