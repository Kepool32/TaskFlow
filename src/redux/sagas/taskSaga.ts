import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTasksSuccess,
  fetchTasksError,
  FETCH_TASKS,
  CREATE_TASK_REQUEST,
  createTaskSuccess,
  createTaskError,
  UPDATE_TASK_FIELDS,
  UPDATE_TASK_STATUS,
  updateTaskStatus,
  DELETE_TASK,
  updateTask,
  createSubtaskSuccess,
  createSubtaskError,
  UPDATE_SUBTASK_STATUS_REQUEST,
  updateSubtaskStatusSuccess,
  updateSubtaskStatusError,
  DELETE_SUBTASK_REQUEST,
  deleteSubtaskSuccess,
  deleteSubtaskError,
  deleteFileError,
  deleteFileSuccess,
  DELETE_FILE_REQUEST,
  uploadFilesSuccess,
  uploadFilesError,
  UPLOAD_FILES_REQUEST,
  CREATE_SUBTASK_REQUEST,
} from '../actions/taskActions';
import {
  getTasksFromAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  createSubtaskAPI,
  updateSubtaskStatusAPI,
  deleteSubtaskAPI,
  deleteFileFromTaskAPI,
  uploadFilesToTaskAPI,
} from '@services/taskApi.ts';
import { Task } from '@types/taskTypes.ts';
import { fetchComments } from './commentsSaga.ts';

function* fetchTasksSaga(action: any) {
  try {
    const tasks: Task[] = yield call(getTasksFromAPI, action.payload);

    yield put(fetchTasksSuccess(tasks));

    yield all(
      tasks.map((task) =>
        call(fetchComments, { payload: { taskId: task._id } }),
      ),
    );
  } catch (error: any) {
    yield put(fetchTasksError(error.message));
  }
}

function* createTaskSaga(action: any): Generator {
  try {
    const createdTask = yield call(
      createTaskAPI,
      action.payload.projectId,
      action.payload,
    );
    yield put(createTaskSuccess(createdTask));
  } catch (error: any) {
    yield put(createTaskError(error.message));
  }
}

function* updateTaskSaga(action: any): Generator {
  try {
    const { _id, title, description, status, priority } = action.payload;
    console.log(action.payload);
    const updatedTask = yield call(updateTaskAPI, _id, {
      title,
      description,
      status,
      priority,
    });
    yield put(updateTask(updatedTask));
  } catch (error: any) {
    console.error('Ошибка при обновлении задачи:', error.message);
  }
}

function* deleteTaskSaga(action: any): Generator {
  try {
    const { taskId, projectId } = action.payload;
    yield call(deleteTaskAPI, { taskId, projectId });
  } catch (error: any) {
    console.error('Ошибка при удалении задачи:', error.message);
  }
}

function* updateTaskStatusSaga(action: any): Generator {
  try {
    const { _id, status, title, description } = action.payload;
    const updatedTask = yield call(updateTaskAPI, _id, {
      status,
      title,
      description,
    });
    if (updatedTask.status !== action.payload.status) {
      yield put(updateTaskStatus(updatedTask));
    }
  } catch (error: any) {
    console.error('Ошибка при обновлении статуса задачи:', error.message);
  }
}

function* createSubtaskSaga(action: any): Generator {
  try {
    const { taskId, subtask } = action.payload;
    const newSubtask = yield call(createSubtaskAPI, taskId, subtask);
    yield put(createSubtaskSuccess(newSubtask));
  } catch (error) {
    if (error instanceof Error) {
      yield put(createSubtaskError(error.message));
    } else {
      yield put(createSubtaskError('Unknown error'));
    }
  }
}

function* updateSubtaskStatusSaga(action: any): Generator {
  try {
    const { taskId, subtaskId, status } = action.payload;
    const updatedSubtask = yield call(
      updateSubtaskStatusAPI,
      taskId,
      subtaskId,
      status,
    );
    yield put(updateSubtaskStatusSuccess(updatedSubtask));
  } catch (error: any) {
    yield put(updateSubtaskStatusError(error.message));
  }
}

function* deleteSubtaskSaga(action: any): Generator {
  try {
    const { taskId, subtaskId } = action.payload;
    yield call(deleteSubtaskAPI, taskId, subtaskId);
    yield put(deleteSubtaskSuccess({ taskId, subtaskId }));
  } catch (error: any) {
    yield put(deleteSubtaskError(error.message));
  }
}

function* deleteFileSaga(action: any): Generator {
  try {
    const { taskId, fileId } = action.payload;
    const response = yield call(deleteFileFromTaskAPI, taskId, fileId);
    yield put(deleteFileSuccess({ taskId, files: response.files }));
  } catch (error: any) {
    yield put(deleteFileError(error.message));
  }
}

function* uploadFilesSaga(action: any): Generator {
  try {
    const { taskId, formData } = action.payload;
    const updatedTask = yield call(uploadFilesToTaskAPI, taskId, formData);
    yield put(uploadFilesSuccess(updatedTask));
  } catch (error: any) {
    yield put(uploadFilesError(error.message));
  }
}

export function* taskSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
  yield takeLatest(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(UPDATE_TASK_FIELDS, updateTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
  yield takeLatest(DELETE_FILE_REQUEST, deleteFileSaga);
  yield takeLatest(UPDATE_TASK_STATUS, updateTaskStatusSaga);
  yield takeLatest(CREATE_SUBTASK_REQUEST, createSubtaskSaga);
  yield takeLatest(UPDATE_SUBTASK_STATUS_REQUEST, updateSubtaskStatusSaga);
  yield takeLatest(DELETE_SUBTASK_REQUEST, deleteSubtaskSaga);
  yield takeLatest(UPLOAD_FILES_REQUEST, uploadFilesSaga);
}
