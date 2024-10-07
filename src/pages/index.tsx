import Head from 'next/head';
import { Inter } from 'next/font/google';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TaskTable from '../components/TaskTable';
import { ToastContainer } from '@/components/Toast';
import { store } from '../../store';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<Provider store={store}>
			<ToastContainer />
			<Box
				sx={{
					height: '100vh', // Takes up full viewport height
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden', // Prevent scroll on main screen
				}}
			>
				<Typography
					fontSize={'40px'}
					fontWeight={'bold'}
					textAlign={'center'}
					marginBottom={'10px'}
				>
					Task Manager App
				</Typography>
				<Box
					sx={{
						width: '100%',
						maxWidth: '1200px',
					}}
				>
					<TaskTable />
				</Box>
			</Box>
		</Provider>
	);
}
