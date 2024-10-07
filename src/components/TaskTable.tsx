import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Paper,
	Box,
	TextField,
	InputAdornment,
	CircularProgress,
} from '@mui/material';
import { PageTitle } from './PageTitle';
import SearchIcon from '@mui/icons-material/Search';
import AddTask from './AddTask';
import DeleteTask from './DeleteTask';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, sortTasks } from '../../store/actions/getTasksActions';
import { RootState } from '../../store';

const initialTasks = [
	{ id: 1, title: 'Meeting Place updated to cafe', description: 'Meeting at swiss cafe' },
	{ id: 2, title: 'Task Manager App Backend issue', description: 'Complete a backend api point' },
	{ id: 3, title: 'Take a break of 5 mins', description: 'Take a break at 3 oclock' },
	{ id: 4, title: 'Meeting with client', description: 'Create a google meet link for meeting' },
	{ id: 5, title: 'After Deployment', description: 'Successfully deployed the app and tested' },
];

const TaskTable: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isSortedAscending, setIsSortedAscending] = useState(true);
	const [addOpen, setAddOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<number>();
	const dispatch: any = useDispatch();
	const { tasks, loading, error } = useSelector((state: RootState) => state.tasksList);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	const handleDelete = (id: number) => {
		setDeleteOpen(true);
		setDeleteId(id);
	};

	const filteredTasks = tasks.filter(
		(task: any) =>
			task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			task.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleAddTask = () => {
		setAddOpen(true);
	};

	const handleSort = () => {
		dispatch(sortTasks(isSortedAscending));
		setIsSortedAscending(!isSortedAscending);
	};

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<PageTitle title='Task Table' />
			<Box display='flex' alignItems='center' justifyContent='space-between' mb={2}>
				<TextField
					label='Search Task'
					variant='outlined'
					onChange={handleSearch}
					sx={{ width: '400px' }}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<SearchIcon />
								</InputAdornment>
							),
						},
					}}
				/>
				<Box>
					<Button variant='contained' color='primary' onClick={handleAddTask} sx={{ mr: 2 }}>
						Add Task
					</Button>
					<Button variant='contained' color='secondary' onClick={handleSort}>
						Sort
					</Button>
				</Box>
			</Box>
			<TableContainer
				component={Paper}
				sx={{
					maxHeight: '500px', 
					overflowY: 'auto',
					mb: 3,
				}}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}> Task Id</TableCell>
							<TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Title</TableCell>
							<TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Description</TableCell>
							<TableCell style={{ fontWeight: 'bold', fontSize: '20px' }}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredTasks.map((task: any) => (
							<TableRow key={task.id}>
								<TableCell>{task.id}</TableCell>
								<TableCell>{task.title}</TableCell>
								<TableCell>{task.description}</TableCell>
								<TableCell>
									<Button variant='contained' color='error' onClick={() => handleDelete(task.id)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{addOpen && <AddTask open={addOpen} onClose={() => setAddOpen(false)} />}
			{deleteOpen && (
				<DeleteTask open={deleteOpen} onClose={() => setDeleteOpen(false)} id={deleteId} />
			)}
		</>
	);
};

export default TaskTable;
