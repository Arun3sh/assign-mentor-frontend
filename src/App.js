import './App.css';
import Home from '../src/components/Home';
import Students from '../src/components/Students';
import { Switch, Route } from 'react-router-dom';
import Mentors from './components/Mentors';
import Changementor from './components/Changementor';
import Createstudent from './components/Createstudent';
import Creatementor from './components/Creatementor';
import Addmentees from './components/Addmentees';

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
				<Route path="/add-mentees">
					<Addmentees />
				</Route>
				<Route path="/create-student">
					<Createstudent />
				</Route>
				<Route path="/create-mentor">
					<Creatementor />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
