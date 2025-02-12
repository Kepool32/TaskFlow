import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
} from '../redux/actions/commentsActions.ts';

export interface Comment {
  _id: string;
  text: string;
  taskId: string;
  parentCommentId?: string | null;
  children: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface GetCommentsRequestAction {
  type: typeof GET_COMMENTS_REQUEST;
}

interface GetCommentsSuccessAction {
  type: typeof GET_COMMENTS_SUCCESS;
  payload: { taskId: string; comments: Comment[] };
}

interface GetCommentsFailureAction {
  type: typeof GET_COMMENTS_FAILURE;
  payload: { error: string };
}

interface CreateCommentRequestAction {
  type: typeof CREATE_COMMENT_REQUEST;
}

interface CreateCommentSuccessAction {
  type: typeof CREATE_COMMENT_SUCCESS;
  payload: { comment: Comment };
}

interface CreateCommentFailureAction {
  type: typeof CREATE_COMMENT_FAILURE;
  payload: { error: string };
}

export type CommentsActionTypes =
  | GetCommentsRequestAction
  | GetCommentsSuccessAction
  | GetCommentsFailureAction
  | CreateCommentRequestAction
  | CreateCommentSuccessAction
  | CreateCommentFailureAction;

export interface CommentsState {
  commentsByTask: Record<string, Comment[]>;
  loading: boolean;
  error: string | null;
}
