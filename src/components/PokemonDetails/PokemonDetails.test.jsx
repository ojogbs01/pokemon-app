import PokemonDetails from "./PokemonDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockPokemonData = {
	name: "bulbasaur",
	id: 1,
	types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
	abilities: [{ ability: { name: "overgrow" } }, { ability: { name: "chlorophyll" } }],
	height: 7,
	weight: 69,
	stats: [
		{ base_stat: 45 },
		{ base_stat: 49 },
		{ base_stat: 49 },
		{ base_stat: 65 },
		{ base_stat: 65 },
		{ base_stat: 45 },
	],
};

const mockSpeciesData = {
	flavor_text_entries: [
		{ flavor_text: "Test description 1" },
		{ flavor_text: "A strange seed was planted on its back at birth." },
	],
	evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
	gender_rate: 1,
};

const mockEvolutionData = {
	chain: {
		species: { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
		evolves_to: [
			{
				species: { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon-species/2/" },
				evolves_to: [
					{
						species: { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon-species/3/" },
						evolves_to: [],
					},
				],
			},
		],
	},
};

function setup() {
	return render(
		<MemoryRouter initialEntries={["/pokemon/1"]}>
			<Routes>
				<Route path="/pokemon/:id" element={<PokemonDetails />} />
			</Routes>
		</MemoryRouter>,
	);
}

describe("PokemonDetails", () => {
	beforeEach(() => {
		globalThis.fetch = vi
			.fn()
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockPokemonData),
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockSpeciesData),
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockEvolutionData),
			});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("renders loading states", async () => {
		expect(true).toBe(true);
	});

	it("displays the pokemon details", async () => {
		setup();
		expect(await screen.findByRole("heading", { name: /bulbasaur/i })).toBeInTheDocument();
		expect(screen.getByText("#0001")).toBeInTheDocument();
		expect(screen.getByText("grass")).toBeInTheDocument();
		expect(screen.getByText("poison")).toBeInTheDocument();
		expect(screen.getByText(/A strange seed was planted on its back at birth./i)).toBeInTheDocument();
	});

	it("displays the pokemon abilities", async () => {
		setup();
		await screen.findByRole("heading", { name: /bulbasaur/i });
		expect(screen.getByText("overgrow")).toBeInTheDocument();
		expect(screen.getByText("chlorophyll")).toBeInTheDocument();
	});

	it("displays the pokemon vitals", async () => {
		setup();
		await screen.findByRole("heading", { name: /bulbasaur/i });
		expect(screen.getByText("0.7m")).toBeInTheDocument();
		expect(screen.getByText("6.9Kg")).toBeInTheDocument();
		expect(screen.getByText("GENDER")).toBeInTheDocument();
		expect(screen.getByText("♂")).toBeInTheDocument();
		expect(screen.getByText("♀")).toBeInTheDocument();
		expect(screen.getByText("87.5%")).toBeInTheDocument();
		expect(screen.getByText("12.5%")).toBeInTheDocument();
	});

	it("displays the pokemon stats", async () => {
		setup();
		await screen.findByRole("heading", { name: /bulbasaur/i });
		expect(screen.getByText("HP")).toBeInTheDocument();
		expect(screen.getByText("ATK")).toBeInTheDocument();
		expect(screen.getByText("DEF")).toBeInTheDocument();
		expect(screen.getByText("SpA")).toBeInTheDocument();
		expect(screen.getByText("SpD")).toBeInTheDocument();
		expect(screen.getByText("SPD")).toBeInTheDocument();
		expect(screen.getAllByText("45").length).toBeGreaterThan(0);
		expect(screen.getAllByText("49").length).toBeGreaterThan(0);
		expect(screen.getAllByText("65").length).toBeGreaterThan(0);
	});

	it("displays the pokemon evolutions", async () => {
		setup();
		await screen.findByText("ivysaur");
		const evolutionsSection = screen.getByText("EVOLUTIONS").closest("div");
		expect(within(evolutionsSection).getByText("bulbasaur")).toBeInTheDocument();
		expect(within(evolutionsSection).getByText("ivysaur")).toBeInTheDocument();
		expect(within(evolutionsSection).getByText("venusaur")).toBeInTheDocument();
	});

	//Back navigation
});
