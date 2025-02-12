export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const getCommentsRequest = (taskId: string) => ({
  type: GET_COMMENTS_REQUEST,
  payload: { taskId },
});

export const getCommentsSuccess = (taskId: string, comments: Comment) => ({
  type: GET_COMMENTS_SUCCESS,
  payload: { taskId, comments },
});

export const getCommentsFailure = (error: string) => ({
  type: GET_COMMENTS_FAILURE,
  payload: { error },
});

export const createCommentRequest = (
  taskId: string,
  text: string,
  parentCommentId: string | undefined,
  onCommentAdded: () => void,
) => ({
  type: CREATE_COMMENT_REQUEST,
  payload: { taskId, text, parentCommentId, onCommentAdded },
});

export const createCommentSuccess = (comment: Comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: { comment },
});

export const createCommentFailure = (error: string) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: { error },
});
