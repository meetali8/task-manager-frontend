import React, { useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import { AddTaskProps } from '@/constants/commonInterfaces';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../store/actions/deleteTaskActions';
import { fetchTasks } from '../../store/actions/getTasksActions';

const DeleteTask = (props: AddTaskProps) => {
	const dispatch: any = useDispatch();
	const { id } = props;

	const handleDelete = () => {
		dispatch(deleteTask(id));
		props.onClose();
	};

	return (
		<Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
			<DialogTitle sx={{ fontWeight: 'bold' }}>Delete Task</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to delete the task?</Typography>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: 2, paddingRight: 3 }}>
				<Button variant='contained' color='primary' onClick={handleDelete}>
					Yes
				</Button>
				<Button variant='outlined' color='inherit' onClick={props.onClose}>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteTask;
