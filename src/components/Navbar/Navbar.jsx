import logo from "../../assets/images/logo.png";
import filter from "../../assets/images/filter.png";
import search from "../../assets/images/search.png";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (searchInput) {
			navigate(`/search/${searchInput}`);
		}
		// else if (searchInput === "") {
		//     navigate("/");
		// }
	}, [searchInput, navigate]);

	return (
		<header className={styles.navbar}>
			<Link to="/" className={styles.leftLink}>
				<div className={styles.left}>
					<img src={logo} alt="Pokedex logo" className={styles.logo} />
					<h1>Pokédex</h1>
				</div>
			</Link>

			<div className={styles.right}>
				<div className={styles["search-container"]}>
					<input
						type="search"
						name="query"
						placeholder="Search Pokemon by name or number..."
						className={styles.input}
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<img src={search} alt="Search icon" className={styles["search-icon"]} />
				</div>
				<img src={filter} alt="Filter icon" className={styles.icon} />
			</div>
		</header>
	);
}

export default Navbar;
