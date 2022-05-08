import './App.css';
import Home from '../src/components/Home';
import Students from '../src/components/Students';
import { Switch, Route } from 'react-router-dom';
import Mentors from './components/Mentors';
import Changementor from './components/Changementor';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/students">
					<Students />
				</Route>
				<Route path="/mentors">
					<Mentors />
				</Route>
				<Route path="/change-mentor">
					<Changementor />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
