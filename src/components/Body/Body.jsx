import PokemonCard from "../PokemonCard/PokemonCard";
import styles from "./Body.module.css";
import { useState, useEffect } from "react";

function Body() {
	const [pokemonList, setPokemonList] = useState([]);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
				const result = await reponse.json();
				setPokemonList(result.results);
				console.log("fetchPokemon: ", result.results); //data will update on next render so can't log it here
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchPokemon();
	}, []);

	useEffect(() => {
		const fetchTypes = async () => {
			const updatedList = await Promise.all(
				pokemonList.map(async (pokemon) => {
					try {
						const response = await fetch(pokemon.url);
						const result = await response.json();
						// Copilot code below
						const types = result.types.map((t) => t.type.name); // ["grass", "poison"]
						return { ...pokemon, types };
					} catch (error) {
						console.error("Error fetching types for", pokemon.name, error);
						return { ...pokemon, types: [] };
					}
				}),
			);
			setPokemonList(updatedList);
		};
		if (pokemonList.length > 0) fetchTypes();
		// Copilot code ends
	}, [pokemonList]);

	return (
		<>
			<main>
				{pokemonList.map((pokemon, index) => (
					<PokemonCard name={pokemon.name} key={index} id={index + 1} types={pokemon.types} />
				))}
			</main>
		</>
	);
}

export default Body;
