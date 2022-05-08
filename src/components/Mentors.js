import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mentor_api } from '../global';

function Mentors() {
	const history = useHistory();
	const [mentor, setMentor] = useState([]);
	useEffect(() => {
		const getMentors = async () => {
			await axios
				.get(`${mentor_api}`)
				.then(({ data }) => setMentor(data))
				.catch((err) => alert('Error', err));
		};
		getMentors();
		console.log(mentor);
	}, []);

	if (mentor.length === 0) {
		return (
			<div className="students-wrapper">
				<div className="students-container">Loading...</div>
			</div>
		);
	}

	return (
		<div className="mentors-wrapper">
			<div className="mentors-container">
				{mentor.map(({ name, email, mentees_assigned }) => (
					<div className="card">
						<div className="card-div">
							<h5>Name </h5>
							<p>{name}</p>
						</div>

						<div className="card-div">
							<h5>Email </h5>
							<p>{email}</p>
						</div>

						<div className="card-div">
							<h5>Mentees :</h5>
							<ul>
								{mentees_assigned.map(({ student_name }) => (
									<li>{student_name}</li>
								))}
							</ul>
						</div>

						<Button variant="outlined">Add Mentee</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Mentors;
