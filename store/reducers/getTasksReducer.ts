import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    FETCH_TASKS_SORT
} from '../actions/getTasksActionsTypes';

const initialState = {
    loading: false,
    tasks: [],
    error: null,
};

export const fetchTaskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
            };
        case FETCH_TASKS_SORT:
            const sortedTasks = [...state.tasks].sort((a: any, b: any) => {
                if (action.payload) {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });
            return {
                ...state,
                tasks: sortedTasks,
            };
        case FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
