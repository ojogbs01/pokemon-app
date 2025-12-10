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
				console.log(result.results); //data will update on next render so can't log it here
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchPokemon();
	}, []);

	return (
		<>
			<main>
				{pokemonList.map((pokemon, index) => (
					<PokemonCard name={pokemon.name} key={index} id={index + 1} />
				))}
			</main>
		</>
	);
}

export default Body;
