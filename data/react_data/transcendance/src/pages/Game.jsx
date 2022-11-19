import Navbar from '../components/Navbar';
import Pong from '../components/Pong';
import Canvas from '../components/Canvas';
import '../styles/App.css';

function Game() {
	return (
		<div>
			<Navbar />
			<div className="App">Play<p> Pong</p>!!!</div>
			<Canvas width="600" height="400"/>
		</div>
	)
}

export default Game
