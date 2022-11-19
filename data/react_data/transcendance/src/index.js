import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Game from './pages/Game'
import Error from './pages/Error'

const root = ReactDOM.createRoot(document.getElementById('root'))

export default function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />}/>
				<Route path="/profile" element={<Profile />}/>
				<Route path="/game" element={<Game />}/>
				<Route path="*" element={<Error />}/>
			</Routes>
		</Router>
	)
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
