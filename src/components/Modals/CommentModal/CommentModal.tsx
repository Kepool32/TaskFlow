import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommentRequest } from '@redux/actions/commentsActions.ts';
import styles from './CommentModal.module.scss'; // Подключаем стили

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  parentCommentId?: string;
  onCommentAdded: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  taskId,
  parentCommentId,
  onCommentAdded,
}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      createCommentRequest(taskId, text, parentCommentId, onCommentAdded),
    );
    setText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.commentModal}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ваш комментарий..."
      />
      <div className={styles.modalFooter}>
        <button
          className={`${styles.button} ${styles.submitButton}`}
          onClick={handleSubmit}
        >
          Отправить
        </button>
        <button
          className={`${styles.button} ${styles.closeButton}`}
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
