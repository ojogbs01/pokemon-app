import styles from "./PokemonCard.module.css";

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

function PokemonCard(props) {
	return (
		<div className={styles.card}>
			<p className={styles.id}>#{props.id}</p>
			<img
				className={styles.sprite}
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
				alt="Pokemon Sprite"
			/>
			<p className={styles.name}>{props.name}</p>
			<div className={styles.types}>
				{props.types ? (
					props.types.map((type, idx) => (
						<p className={styles.type} key={idx} style={typeStyles[type] || {}}>
							{type}
						</p>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

export default PokemonCard;
