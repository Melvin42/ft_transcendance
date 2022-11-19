import Navbar from '../components/Navbar';
import Pong from '../components/Pong';
import Canvas from '../components/Canvas';
import '../styles/App.css';
import SmokeTiger from '../assets/smoke_tiger.jpg'

function Home() {
	return (
		<div>
			<Navbar />
			<img src={SmokeTiger}/>
		</div>
	)
}

export default Home
