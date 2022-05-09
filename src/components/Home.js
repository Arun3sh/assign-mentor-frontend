import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Home() {
	const history = useHistory();
	return (
		<div className="home-wrapper">
			<div className="home-container">
				<Button variant="text" onClick={() => history.push('/create-student')}>
					Create Student
				</Button>
				<Button variant="text" onClick={() => history.push('/create-mentor')}>
					Create Mentor
				</Button>
				<Button variant="text" onClick={() => history.push('/students')}>
					View Students
				</Button>
				<Button variant="text" onClick={() => history.push('/mentors')}>
					View Mentors
				</Button>
			</div>
		</div>
	);
}

export default Home;
