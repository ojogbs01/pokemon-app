import styles from "./PokemonDetails.module.css";
import { useParams, Link } from "react-router-dom";
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
	const [genderRate, setGenderRate] = useState();

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

	const fetchExtras = async () => {
		try {
			const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
			const result = await reponse.json();
			setDescription(result.flavor_text_entries[1].flavor_text);
			console.log("fetchDescription: ", result);
			setEvolutionUrl(result.evolution_chain.url);
			console.log("fetchEvolutionUrl: ", result.evolution_chain.url);
			setGenderRate(result.gender_rate);
			console.log("gender rate: ", result.gender_rate);
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
		fetchExtras();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [id]);

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
				<p className={styles.abilitiesTitle}>Abilities</p>

				{pokemonData.abilities ? (
					<div className={styles.abilityRow}>
						{pokemonData.abilities.map((ability, idx) => (
							<span className={styles.ability} key={idx} title={ability.ability.name}>
								{ability.ability.name}
							</span>
						))}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>

			<div className={styles.vitals}>
				<div className={styles.vital}>
					<p className={styles.vitalText}>HEIGHT</p>
					<div className={styles.vitalPill}>
						{/* If you convert decimeters to meters: (pokemonData.height / 10).toFixed(1) + 'm' */}
						{pokemonData.height ? `${(pokemonData.height / 10).toFixed(1)}m` : "—"}
					</div>
				</div>
				<div className={styles.vital}>
					<p className={styles.vitalText}>WEIGHT</p>
					<div className={styles.vitalPill}>
						{/* If you convert hectograms to kg: (pokemonData.weight / 10).toFixed(1) + 'Kg' */}
						{pokemonData.weight ? `${(pokemonData.weight / 10).toFixed(1)}Kg` : "—"}
					</div>
				</div>
				<div className={styles.vital}>
					<p className={styles.vitalText}>GENDER</p>
					<div className={styles.genderRow}>
						{genderRate === -1 ? (
							<span className={styles.genderLabel}>Genderless</span>
						) : (
							<>
								<div className={styles.genderWithPercent}>
									<div className={`${styles.genderIcon} ${styles.genderMale}`}>
										<span className={styles.genderGlyph}>♂</span>
									</div>
									<span className={styles.genderPercent}>
										{(100 - genderRate * 12.5).toFixed(1)}%
									</span>
								</div>

								<div className={styles.genderWithPercent}>
									<div className={`${styles.genderIcon} ${styles.genderFemale}`}>
										<span className={styles.genderGlyph}>♀</span>
									</div>
									<span className={styles.genderPercent}>{(genderRate * 12.5).toFixed(1)}%</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<div>
				<p className={styles.vitalText}>STATS</p>
				<div className={styles.stats}>
					{pokemonData.stats ? (
						<>
							{[
								{ key: "hp", label: "HP", value: pokemonData.stats[0]?.base_stat },
								{ key: "attack", label: "ATK", value: pokemonData.stats[1]?.base_stat },
								{ key: "defense", label: "DEF", value: pokemonData.stats[2]?.base_stat },
								{ key: "special-attack", label: "SpA", value: pokemonData.stats[3]?.base_stat },
								{ key: "special-defense", label: "SpD", value: pokemonData.stats[4]?.base_stat },
								{ key: "speed", label: "SPD", value: pokemonData.stats[5]?.base_stat },
							].map((s, idx) => (
								<div
									key={idx}
									className={`${styles.statPill} ${styles[`stat_${s.key.replace("-", "")}`]}`}
								>
									<span className={styles.statBadge}>{s.label}</span>
									<span className={styles.statValue}>{s.value ?? "—"}</span>
								</div>
							))}
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>

			<div>
				<p className={styles.vitalText}>EVOLUTIONS</p>
				<div className={styles.evolutions}>
					{evolutions.length > 0 ? (
						<div className={styles.evolutionRow}>
							{evolutions.map((evo, idx) => {
								// Extract ID from species URL
								const evoId = evo.url.split("/").filter(Boolean).pop();
								const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoId}.png`;

								return (
									<>
										<Link to={`/pokemon/${evoId}`} key={idx} className={styles.cardLink}>
											<div key={idx} className={styles.evolutionCard}>
												<img
													className={styles.evolutionImg}
													alt={`${evo.name} Sprite`}
													src={imgSrc}
													loading="lazy"
												/>
												<p className={styles.evolutionName}>{evo.name}</p>
											</div>
										</Link>

										{idx < evolutions.length - 1 && (
											<span className={styles.evolutionArrow} aria-label="evolves to">
												→
											</span>
										)}
									</>
								);
							})}
						</div>
					) : (
						<p>Loading evolutions...</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default PokemonDetails;
