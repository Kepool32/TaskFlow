import { Task, File, Subtask } from '@types/taskTypes.ts';

export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR';
export const UPDATE_TASK_FIELDS = 'UPDATE_TASK_FIELDS';

export const CREATE_SUBTASK_REQUEST = 'CREATE_SUBTASK_REQUEST';
export const CREATE_SUBTASK_SUCCESS = 'CREATE_SUBTASK_SUCCESS';
export const CREATE_SUBTASK_ERROR = 'CREATE_SUBTASK_ERROR';

export const UPLOAD_FILES_REQUEST = 'UPLOAD_FILES_REQUEST';
export const UPLOAD_FILES_SUCCESS = 'UPLOAD_FILES_SUCCESS';
export const UPLOAD_FILES_ERROR = 'UPLOAD_FILES_ERROR';

export const UPDATE_SUBTASK_STATUS_REQUEST = 'UPDATE_SUBTASK_STATUS_REQUEST';
export const UPDATE_SUBTASK_STATUS_SUCCESS = 'UPDATE_SUBTASK_STATUS_SUCCESS';
export const UPDATE_SUBTASK_STATUS_ERROR = 'UPDATE_SUBTASK_STATUS_ERROR';

export const DELETE_SUBTASK_REQUEST = 'DELETE_SUBTASK_REQUEST';
export const DELETE_SUBTASK_SUCCESS = 'DELETE_SUBTASK_SUCCESS';
export const DELETE_SUBTASK_ERROR = 'DELETE_SUBTASK_ERROR';

export const DELETE_FILE_REQUEST = 'DELETE_FILE_REQUEST';
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
export const DELETE_FILE_ERROR = 'DELETE_FILE_ERROR';

export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';

export const updateSearchQuery = (query: string) => ({
  type: UPDATE_SEARCH_QUERY,
  payload: query,
});

export const deleteFileRequest = (taskId: string, fileId: string) => ({
  type: DELETE_FILE_REQUEST,
  payload: { taskId, fileId },
});

export const deleteFileSuccess = (data: { taskId: string; files: File[] }) => ({
  type: DELETE_FILE_SUCCESS,
  payload: data,
});

export const deleteFileError = (error: string) => ({
  type: DELETE_FILE_ERROR,
  payload: error,
});

export const createSubtaskRequest = (
  taskId: string,
  subtask: { title: string },
) => ({
  type: CREATE_SUBTASK_REQUEST,
  payload: { taskId, subtask },
});

export const createSubtaskSuccess = (subtask: Subtask) => ({
  type: CREATE_SUBTASK_SUCCESS,
  payload: subtask,
});

export const createSubtaskError = (error: string) => ({
  type: CREATE_SUBTASK_ERROR,
  payload: error,
});

export const uploadFilesRequest = (taskId: string, formData: FormData) => ({
  type: UPLOAD_FILES_REQUEST,
  payload: { taskId, formData },
});

export const uploadFilesSuccess = (updatedTask: Task) => ({
  type: UPLOAD_FILES_SUCCESS,
  payload: updatedTask,
});

export const uploadFilesError = (error: string) => ({
  type: UPLOAD_FILES_ERROR,
  payload: error,
});

export const createTaskRequest = (task: Task) => ({
  type: CREATE_TASK_REQUEST,
  payload: task,
});

export const createTaskSuccess = (task: Task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

export const createTaskError = (error: string) => ({
  type: CREATE_TASK_ERROR,
  payload: error,
});
export const fetchTasks = (projectId: string) => ({
  type: FETCH_TASKS,
  payload: projectId,
});

export const fetchTasksSuccess = (tasks: any) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksError = (error: string) => ({
  type: FETCH_TASKS_ERROR,
  payload: error,
});

export const updateTask = (task: any) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: any;
}) => ({
  type: DELETE_TASK,
  payload: { taskId, projectId },
});

export const updateTaskStatus = (task: Task) => ({
  type: UPDATE_TASK_STATUS,
  payload: task,
});

export const updateTaskFields = (task: Task) => ({
  type: UPDATE_TASK_FIELDS,
  payload: task,
});
export const updateSubtaskStatusRequest = (
  taskId: string,
  subtaskId: string,
  status: string,
) => ({
  type: UPDATE_SUBTASK_STATUS_REQUEST,
  payload: { taskId, subtaskId, status },
});

export const deleteSubtaskRequest = (taskId: string, subtaskId: string) => ({
  type: DELETE_SUBTASK_REQUEST,
  payload: { taskId, subtaskId },
});

export const deleteSubtaskSuccess = (data: {
  taskId: string;
  subtaskId: string;
}) => ({
  type: DELETE_SUBTASK_SUCCESS,
  payload: data,
});

export const updateSubtaskStatusSuccess = (updatedSubtask: any) => ({
  type: UPDATE_SUBTASK_STATUS_SUCCESS,
  payload: updatedSubtask,
});

export const deleteSubtaskError = (error: string) => ({
  type: DELETE_SUBTASK_ERROR,
  payload: error,
});
export const updateSubtaskStatusError = (error: string) => ({
  type: UPDATE_SUBTASK_STATUS_ERROR,
  payload: error,
});
