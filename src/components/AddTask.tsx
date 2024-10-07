import React, { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from '@mui/material';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { AddTaskProps } from '@/constants/commonInterfaces';
import { useFormik } from 'formik';
import { ErrorToast, SuccessToast } from './Toast';
import { createTask } from '../../store/actions/createTaskActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const AddTask = (props: AddTaskProps) => {
	const dispatch: any = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { loading, error, message } = useSelector((state: RootState) => state.task);
	const initialValues = {
		title: '',
		description: '',
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.max(50, 'Title can not more than 50 characters long')
			.required('Title is required'),
		description: Yup.string()
			.max(100, 'Description can not be more than 100 characters long')
			.required('Description is required'),
	});
	const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
		initialValues: initialValues,
		validationSchema,
		onSubmit: async (values: typeof initialValues) => {
			try {
				setIsSubmitting(true);
				await dispatch(createTask(values));
				if (message) {
					SuccessToast(message);
					setIsSubmitting(false);
				}
				if (error) {
					ErrorToast(error);
				}
				props.onClose();
			} catch (err) {
				ErrorToast('Something went wrong!');
			}
		},
	});

	return (
		<Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
			<DialogTitle sx={{ fontWeight: 'bold' }}>Add Task</DialogTitle>
			<form noValidate onSubmit={handleSubmit}>
				<DialogContent>
					<Stack
						spacing={2}
						marginY={2}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TextField
							variant='outlined'
							label='Add title'
							autoComplete='off'
							fullWidth
							name='title'
							required
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.title}
							error={Boolean(touched.title && errors.title)}
							sx={{ marginBottom: 2 }}
						/>
						<TextField
							variant='outlined'
							autoComplete='off'
							label='Add description'
							name='description'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.description}
							error={Boolean(touched.description && errors.description)}
							fullWidth
							required
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: 2, paddingRight: 3 }}>
					<Button variant='contained' color='primary' type='submit' disabled={loading}>
						Submit
					</Button>

					<Button variant='outlined' color='inherit' onClick={props.onClose}>
						Cancel
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddTask;
