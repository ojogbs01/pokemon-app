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

			const index = await Promise.all(
				data.results.map(async (p) => {
					try {
						const details = await fetch(p.url).then((res) => res.json());
						return {
							name: p.name,
							url: p.url,
							id: details.id || p.url.split("/").filter(Boolean).pop(),
							types: details.types ? details.types.map((t) => t.type.name) : [],
						};
					} catch (error) {
						return {
							name: p.name,
							url: p.url,
							id: p.url.split("/").filter(Boolean).pop(),
							types: [],
						};
					}
				}),
			);

			sessionStorage.setItem("storedPokemonList", JSON.stringify(index));
			setStoredPokemonList(index);
			console.log("Fetched all with types");
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
