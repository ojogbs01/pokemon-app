import styles from "./PokemonDetails.module.css";

function PokemonDetails() {
	return (
		<div className={styles.card}>
			<img
				className={styles.sprite}
				alt="Pokemon Sprite"
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
			/>
			<p className={styles.id}>#1</p>
			<p className={styles.name}>Bulbasaur</p>
			<div className={styles.types}>
				<p className={styles.type}>Grass</p>
				<p className={styles.type}>Poison</p>
			</div>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
			</p>
			<div className={styles.abilities}>
				<p>Abilities</p>
				<p className={styles.ability}>Overgrow</p>
				<p className={styles.ability}>Chronophyll</p>
			</div>
			<div className={styles.vitals}>
				<div className={styles.height}>
					<p className={styles.vitalText}>Height</p>
					<p className={styles.vitalBox}>0.7m</p>
				</div>
				<div className={styles.weight}>
					<p className={styles.vitalText}>Weight</p>
					<p className={styles.vitalBox}>6.9</p>
				</div>
				<div className={styles.gender}>
					<p className={styles.vitalText}>Gender</p>
					<p className={styles.vitalBox}>F M</p>
				</div>
			</div>
			<div className={styles.stats}>
				<div className={styles.hp}>
					<p className={styles.statsText}>HP</p>
					<p className={styles.statsBox}>45</p>
				</div>
				<div className={styles.attack}>
					<p className={styles.statsText}>Attack</p>
					<p className={styles.statsBox}>49</p>
				</div>
				<div className={styles.defense}>
					<p className={styles.statsText}>Defense</p>
					<p className={styles.statsBox}>49</p>
				</div>
				<div className={styles.specialattack}>
					<p className={styles.statsText}>Special Attack</p>
					<p className={styles.statsBox}>65</p>
				</div>
				<div className={styles.specialdefense}>
					<p className={styles.statsText}>Special Defense</p>
					<p className={styles.statsBox}>65</p>
				</div>
				<div className={styles.speed}>
					<p className={styles.statsText}>Speed</p>
					<p className={styles.statsBox}>45</p>
				</div>
			</div>
			<div className={styles.evolutions}>
				<div className={styles.evolutionOne}>
					<p className={styles.evolutionName}>Bulbasaur</p>
					<img
						className={styles.evolutionSprite}
						alt="Pokemon Evolution Sprite"
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
					/>
				</div>
				<div className={styles.evolutionTwo}>
					<p className={styles.evolutionName}>Ivysaur</p>
					<img
						className={styles.evolutionSprite}
						alt="Pokemon Evolution Sprite"
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
					/>
				</div>
				<div className={styles.evolutionThree}>
					<p className={styles.evolutionName}>Venusaur</p>
					<img
						className={styles.evolutionSprite}
						alt="Pokemon Evolution Sprite"
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
					/>
				</div>
			</div>
		</div>
	);
}

export default PokemonDetails;
