export const typeStyles = {
	normal: { background: "#A8A77A", color: "#1C1C1C" },
	fire: { background: "#EE8130", color: "#1C1C1C" },
	water: { background: "#6390F0", color: "#0E2233" },
	electric: { background: "#F7D02C", color: "#1C1C1C" },
	grass: { background: "#7AC74C", color: "#0E2216" },
	ice: { background: "#96D9D6", color: "#0E2222" },
	fighting: { background: "#C22E28", color: "#FFFFFF" },
	poison: { background: "#A33EA1", color: "#FFFFFF" },
	ground: { background: "#E2BF65", color: "#1C1C1C" },
	flying: { background: "#A98FF3", color: "#0E2030" },
	psychic: { background: "#F95587", color: "#1C1C1C" },
	bug: { background: "#A6B91A", color: "#1C1C1C" },
	rock: { background: "#B6A136", color: "#1C1C1C" },
	ghost: { background: "#735797", color: "#FFFFFF" },
	dragon: { background: "#6F35FC", color: "#FFFFFF" },
	dark: { background: "#705746", color: "#FFFFFF" },
	steel: { background: "#B7B7CE", color: "#0E2030" },
	fairy: { background: "#D685AD", color: "#1C1C1C" },
};

export const typeColors = Object.fromEntries(
	Object.entries(typeStyles).map(([type, style]) => [type, style.background]),
);
