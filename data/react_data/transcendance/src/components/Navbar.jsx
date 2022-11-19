import '../styles/Navbar.css';

function testButton() {
	alert('Wait some days to play :p')
}

function Navbar() {
	return (<header>
		<button onClick={() => testButton()}>
			Play
			</button>
		<button onClick={() => testButton()}>
			Play
			</button>
		<button onClick={() => testButton()}>
			Play
			</button>
		<button onClick={() => testButton()}>
			Play
			</button>
		</header>
	)
}

export default Navbar
