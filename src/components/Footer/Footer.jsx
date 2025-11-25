import styles from "./Footer.module.css";

function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				<p>
					Designed by <strong>Stephen Ojogbede</strong>
				</p>
				<a href="https://github.com/ojogbs01/pokemon-app" target="_blank">
					View code on GitHub
				</a>
				<p>&copy; 2025 Pokédex. All rights reserved.</p>
			</footer>
		</>
	);
}

export default Footer;
