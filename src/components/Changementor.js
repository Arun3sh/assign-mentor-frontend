import { Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { mentor_api, student_api } from '../global';
import { SelectChangeEvent } from '@mui/material/Select';

function Changementor() {
	const params = new URLSearchParams(document.location.search);
	const student_name = params.get('name');
	const student_id = params.get('id');

	const history = useHistory();
	const [mentor, setMentor] = useState([]);
	const [student, setStudent] = useState([]);
	const [filter, setFilter] = useState('');
	const [selectValue, setSelectValue] = useState('Choose Mentor');
	const [mentorId, setMentorId] = useState('');

	useEffect(() => {
		const api1 = axios.get(`${mentor_api}`);
		const api2 = axios.get(`${student_api}/${student_id}`);
		const getMentors = async () => {
			await axios
				.all([api1, api2])
				.then((res) => {
					setMentor(res[0].data);
					setStudent(res[1].data);
					setFilter(res[1].data[0].mentor_assigned.mentor_id);
				})
				.catch((err) => alert(err));
		};
		getMentors();
		console.log(student);
	}, []);

	const setNewMentor = async () => {
		let changeMentorData = {
			student_id: student_id,
			student_name: student_name,
			old_mentor_id: student[0].mentor_assigned.mentor_id,
			old_mentor_name: student[0].mentor_assigned.mentor_name,
			mentor_id: mentorId,
			mentor_name: selectValue,
		};

		await axios({
			url: `${student_api}/add-mentor/${student_id}`,
			method: 'PUT',
			data: changeMentorData,
		}).catch((err) => alert(err));
	};

	if (mentor.length === 0) {
		return (
			<div className="changementor-wrapper">
				<div className="changementor-container">Loading...</div>
			</div>
		);
	}

	return (
		<div className="changementor-wrapper">
			<div className="changementor-container">
				<form className="card">
					<div className="card-div">
						<p>Current Mentor</p>
						{mentor
							.filter(({ _id }) => _id === filter)
							.map(({ name }, index) => (
								<p key={index}>{name}</p>
							))}
					</div>
					<Select
						className="select-input"
						id="mentor"
						name="mentor"
						value={selectValue}
						onChange={(e) => setSelectValue(e.target.value)}
					>
						<MenuItem value="Choose Mentor" selected>
							Choose Mentor
						</MenuItem>
						{mentor
							.filter(({ _id }) => _id !== filter)
							.map(({ name, _id }, index) => (
								<MenuItem key={index} value={name} onClick={() => setMentorId(_id)}>
									{name}
								</MenuItem>
							))}
					</Select>
					<Button
						onClick={() => console.log(selectValue) & setNewMentor()}
						variant="outlined"
						color="success"
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Changementor;
