import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { student_api } from '../global';
import { useHistory } from 'react-router-dom';

function Addmentees() {
	const params = new URLSearchParams(document.location.search);
	const mentor_name = params.get('name');
	const mentor_id = params.get('id');
	const history = useHistory();

	const [selected, setSelected] = useState([]);
	const [student, setStudent] = useState([]);
	const options = [];

	// To get studednt data on load
	useEffect(() => {
		const getStudents = async () => {
			await axios
				.get(`${student_api}`)
				.then(({ data }) => setStudent(data))
				.catch((err) => alert('Error', err));
		};
		getStudents();
	}, []);

	// To show only students those don't have any mentor
	student
		.filter(
			({ mentor_assigned }) =>
				mentor_assigned === undefined || mentor_assigned.mentor_id === undefined
		)
		.map(({ name, _id }) => options.push({ label: name, value: _id }));

	const addMentees = async () => {
		var mentees = [];

		// Need to send the below info to api to store mentor info inside student collection and student info inside mentor collection
		selected.map(({ label, value }) =>
			mentees.push({
				student_id: value,
				student_name: label,
				mentor_id: mentor_id,
				mentor_name: mentor_name,
			})
		);

		// To store mentor info inside student collection and student info inside mentor collection
		mentees.map((data) => {
			var myUrl = `${student_api}/add-mentor/${data.student_id}`;

			axios({
				url: `${myUrl}`,
				method: 'PUT',
				data: data,
			}).catch((err) => alert(err));
		});

		history.push('/mentors');
	};

	return (
		<div className="add-mentee-wrapper">
			<div className="add-mentee-container">
				{/* // Multi select option for selecting students */}
				<MultiSelect
					options={options}
					value={selected}
					onChange={setSelected}
					labelledBy="Select"
				/>

				{/* Button holding div for submit and cancel */}
				<div className="btn-div">
					<Button variant="outlined" onClick={() => addMentees()}>
						Add
					</Button>
					<Button variant="outlined" color="error" onClick={() => history.goBack()}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}
export default Addmentees;
