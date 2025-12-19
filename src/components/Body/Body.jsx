import PokemonCard from "../PokemonCard/PokemonCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import styles from "./Body.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Body() {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonWithSprite, setPokemonWithSprite] = useState([]);

	const limit = 20;
	const [offset, setOffset] = useState(0);

	const fetchPokemon = async (limit, offset) => {
		try {
			const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?&limit=${limit}&offset=${offset}`);
			const result = await reponse.json();
			setPokemonList((prev) => [...prev, ...result.results]);
			console.log("fetchPokemon: ", result.results); //data will update on next render so can't log it here
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchPokemon(limit, offset);
	}, [offset]);

	const fetchTypes = async () => {
		const updatedList = await Promise.all(
			pokemonList.map(async (pokemon) => {
				try {
					const response = await fetch(pokemon.url);
					const result = await response.json();
					// Copilot
					const types = result.types.map((t) => t.type.name); // ["grass", "poison"]
					return { ...pokemon, types };
				} catch (error) {
					console.error("Error fetching types for", pokemon.name, error);
					return { ...pokemon, types: [] };
				}
			}),
		);
		setPokemonWithSprite(updatedList);
	};

	useEffect(() => {
		if (pokemonList.length > 0) fetchTypes();
	}, [pokemonList]);

	const loadMore = () => {
		setOffset(limit + offset);
	};

	return (
		<>
			<main>
				{pokemonWithSprite.map((pokemon, index) => (
					<Link to={`/pokemon/${index + 1}`} className={styles.cardLink}>
						<PokemonCard name={pokemon.name} key={index} id={index + 1} types={pokemon.types} />
					</Link>
				))}
			</main>
			<LoadMoreButton onClick={loadMore} />
		</>
	);
}

export default Body;
