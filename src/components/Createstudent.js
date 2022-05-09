import { Button, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { mentor_api, student_api } from '../global';
import { useHistory } from 'react-router-dom';

function Createstudent() {
	const history = useHistory();
	const [mentor, setMentor] = useState([]);
	const [selectMentor, setSelectMentor] = useState('Choose Mentor');
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

	const storeStudent = async (values) => {
		// mentor
		// 	.filter((e) => e._id === selectMentor)
		// 	.map(({ name, _id }) => {
		// 		values.mentor_assigned = { mentor_name: name, mentor_id: _id };
		// 	});
		// console.log(values);
		await axios({
			url: `${student_api}/create-student`,
			method: 'POST',
			data: values,
		})
			.then(() => history.push('/'))
			.catch((err) => alert(err));
	};

	const formValidationSchema = yup.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		batch: yup.string().required(),
	});

	const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
		initialValues: {
			name: '',
			email: '',
			batch: '',
		},
		validationSchema: formValidationSchema,
		onSubmit: () => storeStudent(values),
	});

	return (
		<div className="create-student-wrapper">
			<div className="create-student-container">
				<h3>Create Student</h3>
				<form onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						label="Name"
						id="name"
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.name && touched.name}
						helperText={errors.name && touched.name ? errors.name : ''}
					/>
					<TextField
						variant="outlined"
						label="Email"
						id="email"
						name="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.email && touched.email}
						helperText={errors.email && touched.email ? errors.email : ''}
					/>
					<TextField
						variant="outlined"
						label="Batch"
						id="batch"
						name="batch"
						value={values.batch}
						onChange={handleChange}
						onBlur={handleBlur}
						error={errors.batch && touched.batch}
						helperText={errors.batch && touched.batch ? errors.batch : ''}
					/>
					{/* <Select
						className="select-input"
						id="mentor"
						name="mentor"
						value={selectMentor}
						onChange={(e) => {
							setSelectMentor(e.target.value);
						}}
					>
						<MenuItem value={'Choose Mentor'} selected>
							Choose Mentor
						</MenuItem>
						{mentor.map(({ _id, name }, index) => (
							<MenuItem key={index} value={_id}>
								{name}
							</MenuItem>
						))}
					</Select> */}
					<Button type="submit" variant="outlined">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}
export default Createstudent;
