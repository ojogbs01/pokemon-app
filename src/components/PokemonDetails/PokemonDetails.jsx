import styles from "./PokemonDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const typeStyles = {
	normal: { background: "#A8A878", color: "#1C1C1C" },
	fire: { background: "#F08030", color: "#1C1C1C" },
	water: { background: "#6890F0", color: "#0E2233" },
	electric: { background: "#F8D030", color: "#1C1C1C" },
	grass: { background: "#78C850", color: "#0E2216" },
	ice: { background: "#98D8D8", color: "#0E2222" },
	fighting: { background: "#C03028", color: "#FFFFFF" },
	poison: { background: "#A040A0", color: "#FFFFFF" },
	ground: { background: "#E0C068", color: "#1C1C1C" },
	flying: { background: "#A890F0", color: "#0E2030" },
	psychic: { background: "#F85888", color: "#1C1C1C" },
	bug: { background: "#A8B820", color: "#1C1C1C" },
	rock: { background: "#B8A038", color: "#1C1C1C" },
	ghost: { background: "#705898", color: "#FFFFFF" },
	dragon: { background: "#7038F8", color: "#FFFFFF" },
	dark: { background: "#705848", color: "#FFFFFF" },
	steel: { background: "#B8B8D0", color: "#0E2030" },
	fairy: { background: "#EE99AC", color: "#1C1C1C" },
};

function PokemonDetails() {
	const { id } = useParams();
	const [pokemonData, setPokemonData] = useState([]);
	const [description, setDescription] = useState();
	const [evolutionUrl, setEvolutionUrl] = useState();
	const [evolutions, setEvolutions] = useState([]);

	const fetchData = async () => {
		try {
			const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
			const result = await reponse.json();
			setPokemonData(result);
			console.log("fetchData: ", result);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchDescription = async () => {
		try {
			const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
			const result = await reponse.json();
			setDescription(result.flavor_text_entries[1].flavor_text);
			console.log("fetchDescription: ", result);
			setEvolutionUrl(result.evolution_chain.url);
			console.log("fetchEvolutionUrl: ", result.evolution_chain.url);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchEvolutions = async () => {
		//Copilot code
		try {
			const response = await fetch(evolutionUrl);
			const result = await response.json();

			// Flatten the evolution chain
			const evolutionsArray = [];
			let current = result.chain;

			while (current) {
				evolutionsArray.push(current.species);
				current = current.evolves_to[0]; // follow first branch
			}

			setEvolutions(evolutionsArray);
			console.log("Evolutions:", evolutionsArray);
		} catch (error) {
			console.error("Error fetching evolutions:", error);
		}
	};

	useEffect(() => {
		fetchData();
		fetchDescription();
	}, []);

	useEffect(() => {
		if (evolutionUrl) {
			fetchEvolutions();
		}
	}, [evolutionUrl]);

	return (
		<div className={styles.card}>
			<img
				className={styles.sprite}
				alt="Pokemon Sprite"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
			/>
			<p className={styles.id}>#{id}</p>
			<p className={styles.name}>{pokemonData.name}</p>
			<div className={styles.types}>
				{pokemonData.types ? (
					pokemonData.types.map((type, idx) => (
						<p className={styles.type} key={idx} style={typeStyles[type.type.name] || {}}>
							{type.type.name}
						</p>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
			<p className={styles.description}>{description}</p>
			<div className={styles.abilities}>
				<p>Abilities</p>
				{pokemonData.abilities ? (
					pokemonData.abilities.map((ability, idx) => (
						<p className={styles.ability} key={idx}>
							{ability.ability.name}
						</p>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
			<div className={styles.vitals}>
				<div className={styles.height}>
					<p className={styles.vitalText}>Height</p>
					<p className={styles.vitalBox}>{pokemonData.height}</p>
				</div>
				<div className={styles.weight}>
					<p className={styles.vitalText}>Weight</p>
					<p className={styles.vitalBox}>{pokemonData.weight}</p>
				</div>
				<div className={styles.gender}>
					<p className={styles.vitalText}>Gender</p>
					<p className={styles.vitalBox}>F M*</p>
				</div>
			</div>
			<div className={styles.stats}>
				<div className={styles.hp}>
					<p className={styles.statsText}>HP</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[0]?.base_stat : "Loading..."}
					</p>
				</div>
				<div className={styles.attack}>
					<p className={styles.statsText}>ATK</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[1]?.base_stat : "Loading..."}
					</p>
				</div>
				<div className={styles.defense}>
					<p className={styles.statsText}>DEF</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[2]?.base_stat : "Loading..."}
					</p>
				</div>
				<div className={styles.specialattack}>
					<p className={styles.statsText}>SpA</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[3]?.base_stat : "Loading..."}
					</p>
				</div>
				<div className={styles.specialdefense}>
					<p className={styles.statsText}>SpD</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[4]?.base_stat : "Loading..."}
					</p>
				</div>
				<div className={styles.speed}>
					<p className={styles.statsText}>SPD</p>
					<p className={styles.statsBox}>
						{pokemonData.stats ? pokemonData.stats[5]?.base_stat : "Loading..."}
					</p>
				</div>
			</div>

			<div className={styles.evolutions}>
				{/* Copilot code */}
				{evolutions.length > 0 ? (
					evolutions.map((evo, idx) => {
						// Extract ID from species URL
						const id = evo.url.split("/").filter(Boolean).pop();
						return (
							<div key={idx} className={styles.evolutionCard}>
								<p className={styles.evolutionName}>{evo.name}</p>
								<img
									className={styles.evolutionSprite}
									alt={`${evo.name} Sprite`}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
								/>
							</div>
						);
					})
				) : (
					<p>Loading evolutions...</p>
				)}
			</div>
		</div>
	);
}

export default PokemonDetails;
