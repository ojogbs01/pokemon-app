import styles from "./PokemonCard.module.css";
import { typeStyles } from "../../utils";

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
