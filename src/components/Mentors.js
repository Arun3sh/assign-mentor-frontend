import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mentor_api } from '../global';

function Mentors() {
	const history = useHistory();
	const [mentor, setMentor] = useState([]);

	// To get all mentor data on load
	useEffect(() => {
		const getMentors = async () => {
			await axios
				.get(`${mentor_api}`)
				.then(({ data }) => setMentor(data))
				.catch((err) => alert('Error', err));
		};
		getMentors();
	}, []);

	// When the api is fetching data this is displayed or when there is no mentor data
	if (mentor.length === 0) {
		return (
			<div className="students-wrapper">
				<div className="students-container">Loading...</div>
			</div>
		);
	}

	return (
		<div className="mentors-wrapper">
			{/* Button to goback to main menu */}
			<Button
				variant="outlined"
				color="error"
				style={{ width: '25px' }}
				onClick={() => history.push('/')}
			>
				Back
			</Button>
			<div className="mentors-container">
				{mentor.map(({ _id, name, email, mentees_assigned }, index) => (
					// Card that holds user info
					<div className="card" key={index}>
						<div className="card-div">
							<h5>Name </h5>
							<p>{name}</p>
						</div>

						<div className="card-div">
							<h5>Email </h5>
							<p>{email}</p>
						</div>

						{mentees_assigned !== undefined ? (
							<div className="card-div">
								<h5>Mentees :</h5>
								<ul>
									{mentees_assigned.map(({ student_name }, index) => (
										<li key={index}>{student_name}</li>
									))}
								</ul>
							</div>
						) : (
							''
						)}

						<Button
							variant="outlined"
							onClick={() => history.push(`/add-mentees?id=${_id}&name=${name}`)}
						>
							Add Mentee
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Mentors;
