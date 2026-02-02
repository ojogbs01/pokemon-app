import styles from "./PokemonDetails.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const typeColors = {
	normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
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

	const primaryType = pokemonData?.types?.[0]?.type?.name || "normal";
	const heroColor = typeColors[primaryType] || "#7f8c8d"; // fallback

	const navigate = useNavigate();
	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/", { replace: true });
		}
	};

	return (
		<div className={styles.card} style={{ "--hero": heroColor }}>
			<div className={styles.hero}>
				<div className={styles.heroTopRow}>
					<button className={styles.heroIconBtn} aria-label="Back" onClick={handleBack}>
						←
					</button>
					<button className={styles.heroIconBtn} aria-label="Favourite">
						☆
					</button>
				</div>

				<p className={styles.id}>#{String(id).padStart(4, "0")}</p>
				<h1 className={styles.heroName}>{pokemonData.name}</h1>

				<div className={styles.heroTypes}>
					{pokemonData.types?.map((t, idx) => (
						<span className={styles.heroTypePill} key={idx}>
							{t.type.name}
						</span>
					))}
				</div>

				<img
					className={styles.heroSprite}
					alt="Pokemon Sprite"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
					loading="eager"
				/>
			</div>

			<div className={styles.sheet}>
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
		</div>
	);
}

export default PokemonDetails;
