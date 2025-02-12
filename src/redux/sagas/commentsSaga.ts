import { call, put, takeLatest } from 'redux-saga/effects';
import { createComment, getCommentsByTask } from '@services/commentApi.ts';
import {
  CREATE_COMMENT_REQUEST,
  createCommentFailure,
  createCommentSuccess,
  GET_COMMENTS_REQUEST,
  getCommentsFailure,
  getCommentsSuccess,
} from '../actions/commentsActions.ts';

export function* fetchComments(action: {
  payload: { taskId: string };
}): Generator {
  try {
    const comments = yield call(getCommentsByTask, action.payload.taskId);
    yield put(getCommentsSuccess(action.payload.taskId, comments));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getCommentsFailure(error.message));
    } else {
      yield put(getCommentsFailure('Unknown error'));
    }
  }
}

function* postComment(action: {
  payload: {
    taskId: string;
    text: string;
    parentCommentId: null | undefined;
    onCommentAdded: () => void;
  };
}): Generator {
  try {
    const newComment = yield call(
      createComment,
      action.payload.taskId,
      action.payload.text,
      action.payload.parentCommentId,
    );
    yield put(createCommentSuccess(newComment));
    if (action.payload.onCommentAdded) {
      action.payload.onCommentAdded();
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(createCommentFailure(error.message));
    } else {
      yield put(createCommentFailure('Unknown error'));
    }
  }
}

export function* commentSaga() {
  yield takeLatest<any>(GET_COMMENTS_REQUEST, fetchComments);
  yield takeLatest<any>(CREATE_COMMENT_REQUEST, postComment);
}
