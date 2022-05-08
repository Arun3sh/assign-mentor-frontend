import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { student_api } from '../global';

function Students() {
	const history = useHistory();
	const [student, setStudent] = useState([]);
	useEffect(() => {
		const getStudents = async () => {
			console.log('data');
			await axios
				.get(`${student_api}`)
				.then(({ data }) => setStudent(data))
				.catch((err) => alert('Error', err));
		};
		getStudents();
		console.log(student);
	}, []);

	if (student.length === 0) {
		return (
			<div className="students-wrapper">
				<div className="students-container">Loading...</div>
			</div>
		);
	}
	return (
		<div className="students-wrapper">
			<div className="students-container">
				{student.map(({ _id, name, email, batch, mentor_assigned }, index) => (
					<div className="card" key={index}>
						<div className="card-div">
							<h5>Name </h5>
							<p>{name}</p>
						</div>

						<div className="card-div">
							<h5>Email </h5>
							<p>{email}</p>
						</div>

						<div className="card-div">
							<h5>Batch </h5>
							<p>{batch}</p>
						</div>

						<div className="card-div">
							<h5>Mentor </h5>
							<p>{mentor_assigned.mentor_name}</p>
						</div>

						<Button
							variant="outlined"
							onClick={() => history.push(`/change-mentor?id=${_id}&name=${name}`)}
						>
							Change Mentor
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Students;
