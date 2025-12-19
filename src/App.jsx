import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/pokemon/:id" element={<PokemonPage />} />
					<Route path="*" element={<h1>Page Not Found!</h1>} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
