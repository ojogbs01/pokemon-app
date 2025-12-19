import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/details" element={<Details />} />
					<Route path="*" element={<h1>Page Not Found!</h1>} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
