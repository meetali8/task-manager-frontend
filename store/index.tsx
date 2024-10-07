import { combineReducers } from 'redux';
import { taskReducer } from './reducers/createTaskReducer';
import { configureStore } from '@reduxjs/toolkit';
import { fetchTaskReducer } from './reducers/getTasksReducer';


const rootReducer = combineReducers({
	task: taskReducer,
    tasksList: fetchTaskReducer
});

export const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
