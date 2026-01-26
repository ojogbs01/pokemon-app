import PokemonCard from "../PokemonCard/PokemonCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import styles from "./PokemonGrid.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PokemonGrid({ pokemonList: externalList }) {
	const [pokemonList, setPokemonList] = useState([]);
	const [pokemonWithSprite, setPokemonWithSprite] = useState([]);
	const limit = 20;
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		if (externalList) {
			setPokemonWithSprite(externalList);
		}
	}, [externalList]);

	useEffect(() => {
		if (!externalList) {
			const fetchPokemon = async (limit, offset) => {
				try {
					const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/?&limit=${limit}&offset=${offset}`);
					const result = await reponse.json();
					setPokemonList((prev) => [...prev, ...result.results]);
					console.log("fetchPokemon: ", result.results);
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};
			fetchPokemon(limit, offset);
		}
	}, [offset, externalList]);

	useEffect(() => {
		if (!externalList && pokemonList.length > 0) {
			const fetchTypes = async () => {
				const updatedList = await Promise.all(
					pokemonList.map(async (pokemon) => {
						try {
							const response = await fetch(pokemon.url);
							const result = await response.json();
							const types = result.types.map((t) => t.type.name);
							return { ...pokemon, types };
						} catch (error) {
							console.error("Error fetching types for", pokemon.name, error);
							return { ...pokemon, types: [] };
						}
					}),
				);
				setPokemonWithSprite(updatedList);
			};
			fetchTypes();
		}
	}, [pokemonList, externalList]);

	const loadMore = () => {
		setOffset(limit + offset);
	};

	return (
		<>
			<main className={styles.main}>
				{(pokemonWithSprite || []).map((pokemon, index) => (
					<Link
						to={`/pokemon/${pokemon.id || index + 1}`}
						className={styles.cardLink}
						key={pokemon.id || index + 1}
					>
						<PokemonCard name={pokemon.name} id={pokemon.id || index + 1} types={pokemon.types} />
					</Link>
				))}
			</main>
			{!externalList && <LoadMoreButton onClick={loadMore} />}
		</>
	);
}

export default PokemonGrid;
