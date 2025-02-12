import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
} from '../actions/commentsActions.ts';
import { CommentsActionTypes, CommentsState } from '@types/commetTypes.ts';

const initialState: CommentsState = {
  commentsByTask: {},
  loading: false,
  error: null,
};

export const commentReducer = (
  state = initialState,
  action: CommentsActionTypes,
) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENTS_SUCCESS: {
      const { taskId, comments } = action.payload;
      return {
        ...state,
        loading: false,
        commentsByTask: {
          ...state.commentsByTask,
          [taskId]: comments,
        },
      };
    }
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COMMENT_SUCCESS: {
      const { comment } = action.payload;
      const taskId = comment.taskId;
      const taskComments = state.commentsByTask[taskId] || [];
      return {
        ...state,
        loading: false,
        commentsByTask: {
          ...state.commentsByTask,
          [taskId]: [...taskComments, comment],
        },
      };
    }
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
