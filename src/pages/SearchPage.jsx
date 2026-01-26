import { useParams } from "react-router-dom";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";

function SearchPage() {
	const { searchInput } = useParams();
	const cachedPokemonList = JSON.parse(sessionStorage.getItem("storedPokemonList") || "[]");

	const results = cachedPokemonList.filter((item) => item.name.includes(searchInput));

	return (
		<>
			<PokemonGrid pokemonList={results} />
		</>
	);
}

export default SearchPage;
