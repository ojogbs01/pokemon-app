import styles from "./LoadMoreButton.module.css";

function LoadMoreButton(props) {
	return (
		<button className={styles.loadmore} type="button" onClick={props.onClick}>
			Load More
		</button>
	);
}

export default LoadMoreButton;
