import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { taskReducer } from './reducers/taskReducer';
import { projectReducer } from './reducers/projectReducer';
import rootSaga from './sagas/rootSaga';
import { commentReducer } from './reducers/commentsReducer.ts';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  tasks: taskReducer,
  projects: projectReducer,
  comments: commentReducer,
});

// Определяем тип RootState
export type RootState = ReturnType<typeof rootReducer>;

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
