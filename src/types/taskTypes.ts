import {
  CREATE_SUBTASK_SUCCESS,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_FILE_SUCCESS,
  DELETE_SUBTASK_SUCCESS,
  DELETE_TASK,
  FETCH_TASKS,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_SUCCESS,
  UPDATE_SEARCH_QUERY,
  UPDATE_SUBTASK_STATUS_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FIELDS,
  UPDATE_TASK_STATUS,
  UPLOAD_FILES_SUCCESS,
} from '../redux/actions/taskActions.ts';

export interface Task {
  parentTaskId: any;
  projectId: string;
  _id: string;
  title: string;
  description: string;
  status: 'Queue' | 'Development' | 'Done';
  files: File[];
  subtasks: Subtask[];
  priority: string;
}

export interface Subtask {
  status: string;
  _id: string;
  title: string;
}

export interface File {
  _id: string;
  filename: string;
  url: string;
}

export interface FetchTasksAction {
  type: typeof FETCH_TASKS;
}

export interface FetchTasksSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS;
  payload: Task[];
}

export interface FetchTasksErrorAction {
  type: typeof FETCH_TASKS_ERROR;
  payload: string;
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: { taskId: string };
}

export interface UpdateTaskStatusAction {
  type: typeof UPDATE_TASK_STATUS;
  payload: { _id: string; status: string };
}

export interface CreateTaskSuccessAction {
  type: typeof CREATE_TASK_SUCCESS;
  payload: Task;
}

export interface CreateTaskErrorAction {
  type: typeof CREATE_TASK_ERROR;
  payload: string;
}

export interface UploadFilesSuccessAction {
  type: typeof UPLOAD_FILES_SUCCESS;
  payload: Task;
}

export interface CreateSubtaskSuccessAction {
  type: typeof CREATE_SUBTASK_SUCCESS;
  payload: Task;
}

export interface UpdateTaskFieldsAction {
  type: typeof UPDATE_TASK_FIELDS;
  payload: { _id: string; title: string; description: string };
}

export interface DeleteSubtaskSuccessAction {
  type: typeof DELETE_SUBTASK_SUCCESS;
  payload: { taskId: string; subtaskId: string };
}

export interface UpdateSubtaskStatusSuccessAction {
  type: typeof UPDATE_SUBTASK_STATUS_SUCCESS;
  payload: { taskId: string; _id: string; status: string };
}

export interface DeleteFileSuccessAction {
  type: typeof DELETE_FILE_SUCCESS;
  payload: { taskId: string; files: string[] };
}

export interface UpdateSearchQueryAction {
  type: typeof UPDATE_SEARCH_QUERY;
  payload: string;
}
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export type TaskAction =
  | FetchTasksAction
  | FetchTasksSuccessAction
  | FetchTasksErrorAction
  | UpdateTaskAction
  | DeleteTaskAction
  | UpdateTaskStatusAction
  | CreateTaskSuccessAction
  | CreateTaskErrorAction
  | UploadFilesSuccessAction
  | CreateSubtaskSuccessAction
  | UpdateTaskFieldsAction
  | DeleteSubtaskSuccessAction
  | UpdateSubtaskStatusSuccessAction
  | DeleteFileSuccessAction
  | UpdateSearchQueryAction;
