import PokemonDetails from "./PokemonDetails";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("PokemonDetails", () => {
	it("dummy test that always passes", () => {
		expect(true).toBe(true);
	});
});
