import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchProjectsSuccess,
  fetchProjectsError,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  DELETE_PROJECT,
} from '../actions/projectActions';
import {
  getProjectsFromAPI,
  createProjectAPI,
  deleteProjectAPI,
} from '@services/projectApi.ts';

function* fetchProjectsSaga(): Generator {
  try {
    const projects: any = yield call(getProjectsFromAPI);
    yield put(fetchProjectsSuccess(projects));
  } catch (error: any) {
    yield put(fetchProjectsError(error.message));
  }
}

function* createProjectSaga(action: { type: string; payload: any }): Generator {
  try {
    yield call(createProjectAPI, action.payload);
    yield call(fetchProjectsSaga);
  } catch (error: any) {
    console.error('Ошибка при создании проекта:', error.message);
  }
}

function* deleteProjectSaga(action: {
  type: string;
  payload: string;
}): Generator {
  try {
    yield call(deleteProjectAPI, action.payload);
    yield call(fetchProjectsSaga);
  } catch (error: any) {
    console.error('Ошибка при удалении проекта:', error.message);
  }
}

export function* projectSaga(): Generator {
  yield takeLatest(FETCH_PROJECTS, fetchProjectsSaga);
  yield takeLatest(CREATE_PROJECT, createProjectSaga);
  yield takeLatest(DELETE_PROJECT, deleteProjectSaga);
}
