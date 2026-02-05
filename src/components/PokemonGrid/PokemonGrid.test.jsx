import PokemonGrid from "./PokemonGrid";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockPokemonListResponse = {
	results: [
		{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
		{ name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
	],
};
const mockBulbasaurDetail = {
	id: 1,
	name: "bulbasaur",
	types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
};
const mockIvysaurDetail = {
	id: 2,
	name: "ivysaur",
	types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
};
const mockExternalList = [
	{ id: 1, name: "bulbasaur", types: ["grass", "poison"] },
	{ id: 2, name: "ivysaur", types: ["grass", "poison"] },
];

const renderGrid = (props = {}) =>
	render(
		<MemoryRouter>
			<PokemonGrid {...props} />
		</MemoryRouter>,
	);

const setupDefaultFetchMock = () => {
	const fetchMock = vi
		.fn()
		.mockResolvedValueOnce({
			json: () => Promise.resolve(mockPokemonListResponse),
		})
		.mockResolvedValueOnce({
			json: () => Promise.resolve(mockBulbasaurDetail),
		})
		.mockResolvedValueOnce({
			json: () => Promise.resolve(mockIvysaurDetail),
		});
	globalThis.fetch = fetchMock;
	return fetchMock;
};

describe("PokemonGrid", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("fetches on mount when no external list is provided", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockPokemonListResponse),
			})
			.mockResolvedValue({
				json: () => Promise.resolve(mockBulbasaurDetail),
			});
		globalThis.fetch = fetchMock;
		renderGrid();

		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledWith(
				expect.stringContaining("https://pokeapi.co/api/v2/pokemon/?&limit=20&offset=0"),
			);
		});
	});

	it("renders a list of pokemon cards", async () => {
		setupDefaultFetchMock();
		renderGrid();

		expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
		expect(await screen.findByText(/ivysaur/i)).toBeInTheDocument();
	});

	it("renders pokemon names and types", async () => {
		setupDefaultFetchMock();
		renderGrid();

		expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
		expect(await screen.findByText(/ivysaur/i)).toBeInTheDocument();
		expect(await screen.findAllByText(/grass/i)).toHaveLength(2);
		expect(await screen.findAllByText(/poison/i)).toHaveLength(2);
	});

	it("renders links to the pokemon details pages", async () => {
		setupDefaultFetchMock();
		renderGrid();

		const links = await screen.findAllByRole("link");
		expect(links[0]).toHaveAttribute("href", "/pokemon/1");
		expect(links[1]).toHaveAttribute("href", "/pokemon/2");
	});

	it("fetches and appends pokemon when load more is clicked", async () => {
		const firstBatch = {
			results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
		};
		const secondBatch = {
			results: [{ name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" }],
		};

		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				json: () => Promise.resolve(firstBatch),
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockBulbasaurDetail),
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(secondBatch),
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(mockIvysaurDetail),
			});
		globalThis.fetch = fetchMock;
		renderGrid();

		expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button"));
		expect(await screen.findByText(/ivysaur/i)).toBeInTheDocument();
	});

	it("does not render load more button when using external list (search results)", () => {
		renderGrid({ pokemonList: mockExternalList });
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("handles empty or missing pokemon data", () => {
		renderGrid({ pokemonList: [] });
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});
});
