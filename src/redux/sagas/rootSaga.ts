import { all } from 'redux-saga/effects';
import { projectSaga } from './projectSaga';
import { taskSaga } from './taskSaga.ts';
import { commentSaga } from './commentsSaga.ts';

// Запускаем все саги
export default function* rootSaga() {
  yield all([projectSaga(), taskSaga(), commentSaga()]);
}
