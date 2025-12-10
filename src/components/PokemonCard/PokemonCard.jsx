import styles from "./PokemonCard.module.css";

function PokemonCard(props) {
	return (
		<div className={styles.card}>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
				alt="Pokemon Sprite"
			/>
			<p>{props.id}</p>
			<p>{props.name}</p>
			<p>{props.types ? props.types.join(", ") : "Loading..."}</p>
		</div>
	);
}

export default PokemonCard;
