import React, { useState } from 'react';
import styles from './CommentList.module.scss';
import { Comment } from "@types/commetTypes";

interface CommentListProps {
  comments: Comment[];
  openReplyModal: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  openReplyModal,
}) => {
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleToggleReplies = (commentId: string) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const renderComments = (comments: Comment[]) => {
    return comments.map((comment) => (
      <div key={comment._id} className={styles.comment}>
        <div className={styles.commentHeader}>
          <p className={styles.commentText}>{comment.text}</p>
          <div className={styles.commentActions}>
            <button
              onClick={() => openReplyModal(comment._id)}
              className={styles.replyButton}
            >
              Ответить
            </button>
            {comment.children.length > 0 && (
              <button
                onClick={() => handleToggleReplies(comment._id)}
                className={styles.toggleRepliesButton}
              >
                {showReplies[comment._id] ? 'Скрыть ответы' : 'Показать ответы'}
              </button>
            )}
          </div>
        </div>
        {showReplies[comment._id] &&
          comment.children &&
          comment.children.length > 0 && (
            <div className={styles.replies}>
              {renderComments(comment.children)}
            </div>
          )}
      </div>
    ));
  };

  return <div>{renderComments(comments)}</div>;
};

export default CommentList;
