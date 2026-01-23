import { useState, useEffect } from "react";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";

function HomePage() {
	const [storedPokemonList, setStoredPokemonList] = useState([]);

	const fetchAll = async () => {
		const cachedPokemonList = sessionStorage.getItem("storedPokemonList");
		if (cachedPokemonList) {
			setStoredPokemonList(JSON.parse(cachedPokemonList));
		} else {
			const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
			const data = await res.json();

			const index = data.results.map((p) => ({
				name: p.name,
				url: p.url,
				id: p.url.split("/").filter(Boolean).pop(),
			}));

			sessionStorage.setItem("storedPokemonList", JSON.stringify(index));
			setStoredPokemonList(index);
			console.log("Fetched all");
		}
	};

	useEffect(() => {
		fetchAll();
	}, []);

	return (
		<>
			<PokemonGrid />
		</>
	);
}

export default HomePage;
