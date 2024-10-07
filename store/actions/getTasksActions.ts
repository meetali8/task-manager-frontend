import { Dispatch } from 'redux';
import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, FETCH_TASKS_SORT } from './getTasksActionsTypes';
import { getRequest } from '../../utils/httpClient';
import { TaskProps } from '@/constants/commonInterfaces';

export const sortTasks = (isSortedAscending: boolean) => ({
  type: FETCH_TASKS_SORT,
  payload: isSortedAscending,
});


export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks: TaskProps) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error: string) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
});

export const fetchTasks = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTasksRequest());
        try {
            const response = await getRequest(`${process.env.BASE_URL}/tasks`);
            if (response.statusCode === 200) {
                dispatch(fetchTasksSuccess(response.tasks));
            } else {
                dispatch(fetchTasksFailure(response.message));
            }
        } catch (error) {
            dispatch(fetchTasksFailure('Failed to fetch tasks.'));
        }
    };
};
