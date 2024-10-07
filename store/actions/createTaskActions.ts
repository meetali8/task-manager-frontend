import { Dispatch } from 'redux';
import { CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE } from './createTaskActionTypes';
import { postRequest } from '../../utils/httpClient';
import { TaskProps } from '@/constants/commonInterfaces';
import { ErrorToast, SuccessToast } from '@/components/Toast';
import { fetchTasks } from './getTasksActions';

export const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
});

export const createTaskSuccess = (message: string) => ({
  type: CREATE_TASK_SUCCESS,
  payload: message,
});

export const createTaskFailure = (error: string) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const createTask = (payload: TaskProps) => {
  return async (dispatch: any) => {
    dispatch(createTaskRequest());
    try {
      const response = await postRequest(`${process.env.BASE_URL}/tasks`, payload);
      if (response.statusCode === 200) {
        dispatch(createTaskSuccess(response.message));
        dispatch(fetchTasks());
      } else {
        dispatch(createTaskFailure(response.message));
      }
    } catch (error) {
      dispatch(createTaskFailure('Something went wrong!'));
    }
  };
};
