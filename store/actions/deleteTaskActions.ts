import axios from 'axios';
import {
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from './deleteTaskActionsTypes';
import { fetchTasks } from './getTasksActions';

// Delete task action
export const deleteTask = (taskId: number) => async (dispatch: any) => {
  dispatch({ type: DELETE_TASK_REQUEST });

  try {
    const response = await axios.delete(`${process.env.BASE_URL}/tasks/${taskId}`);
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: response.data.message,
    });
    dispatch(fetchTasks());
  } catch (error: any) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error.response?.data?.message || 'Something went wrong!',
    });
  }
};
