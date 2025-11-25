import { useState, useEffect } from "react";

function Body() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
				const result = await reponse.json();
				setData(result.results);
				console.log(result.results); //data will update on next render so can't log it here
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchPokemon();
	}, []);

	return (
		<>
			<ul>
				{data.map((pokemon, index) => (
					<li key={index}>{pokemon.name}</li>
				))}
			</ul>
		</>
	);
}

export default Body;
