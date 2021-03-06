import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { student_api } from '../global';
import { useHistory } from 'react-router-dom';

function Createstudent() {
	const history = useHistory();

	// To store new student data in db
	const storeStudent = async (values) => {
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
				<form className="create-student-form" onSubmit={handleSubmit}>
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

					<div className="btn-div">
						<Button type="submit" variant="outlined">
							Submit
						</Button>
						<Button variant="outlined" color="error" onClick={() => history.goBack()}>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Createstudent;
