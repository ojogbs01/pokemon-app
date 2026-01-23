import { useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard/PokemonCard";

function SearchPage() {
	const { searchInput } = useParams();
	const cachedPokemonList = JSON.parse(sessionStorage.getItem("storedPokemonList") || "[]");

	const results = cachedPokemonList.filter((item) => item.name.includes(searchInput));

	return (
		<>
			<ul>
				{results.map((item) => (
					<PokemonCard name={item.name} key={item.id} id={item.id} />
				))}
			</ul>
		</>
	);
}

export default SearchPage;
