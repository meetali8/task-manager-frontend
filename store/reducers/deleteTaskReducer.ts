import { DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS } from '../actions/deleteTaskActionsTypes';


const initialState = {
    loading: false,
    tasks: [],
    error: null,
};

export const deleteTaskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter((task: any) => task.id !== action.payload),
            };
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
