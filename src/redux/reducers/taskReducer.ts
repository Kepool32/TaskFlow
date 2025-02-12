import {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  UPDATE_TASK,
  DELETE_TASK,
  UPDATE_TASK_STATUS,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  UPLOAD_FILES_SUCCESS,
  CREATE_SUBTASK_SUCCESS,
  UPDATE_TASK_FIELDS,
  DELETE_SUBTASK_SUCCESS,
  UPDATE_SUBTASK_STATUS_SUCCESS,
  DELETE_FILE_SUCCESS,
  UPDATE_SEARCH_QUERY,
} from '../actions/taskActions';
import { Subtask, Task, TaskAction, TaskState } from '@types/taskTypes.ts';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const taskReducer = (
  state = initialState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, loading: true, error: null };

    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };

    case FETCH_TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload, priority: action.payload.priority }
            : task,
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload.taskId),
      };

    case UPDATE_TASK_STATUS:
      return <TaskState>{
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task._id === action.payload._id &&
          task.status !== action.payload.status
            ? { ...task, status: action.payload.status }
            : task,
        ),
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case CREATE_SUBTASK_SUCCESS: {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task._id === newTask._id ? newTask : task,
        ),
      };
    }
    case UPLOAD_FILES_SUCCESS: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === updatedTask._id
            ? { ...task, files: updatedTask.files }
            : task,
        ),
      };
    }

    case UPDATE_TASK_FIELDS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
              }
            : task,
        ),
      };

    case UPDATE_SUBTASK_STATUS_SUCCESS: {
      const updatedSubtask = action.payload;
      return <TaskState>{
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task._id === updatedSubtask.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask: Subtask) =>
                  subtask._id === updatedSubtask._id ? updatedSubtask : subtask,
                ),
              }
            : task,
        ),
      };
    }

    case DELETE_SUBTASK_SUCCESS: {
      const { taskId, subtaskId } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task._id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask: Subtask) => subtask._id !== subtaskId,
                ),
              }
            : task,
        ),
      };
    }

    case DELETE_FILE_SUCCESS: {
      const { taskId, files } = action.payload;
      return <TaskState>{
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task._id === taskId
            ? {
                ...task,
                files: files,
              }
            : task,
        ),
      };
    }
    case CREATE_TASK_ERROR:
      return { ...state, error: action.payload };

    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};
