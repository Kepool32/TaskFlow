import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsRequest } from '@redux/actions/commentsActions';
import { RootState } from '../../../redux/store';
import CommentModal from '../../Modals/CommentModal/CommentModal';
import CommentList from '../../Comment/CommnetList/CommentList';
import { Task } from '.@types/taskTypes';
import TaskFileUpload from '../TaskFileUpload/TaskFileUpload';
import TaskModal from '../../Modals/TaskModal/TaskModal';
import {
  deleteSubtaskRequest,
  updateSubtaskStatusRequest,
  deleteFileRequest,
} from '@redux/actions/taskActions';
import styles from './TaskItem.module.scss';
import TaskFileDisplay from '../TaskFileUpload/TaskFileDisplay/TaskFileDisplay.tsx';
import SubtasksSection from '../SubtasksSection/SubtasksSection.tsx';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const dispatch = useDispatch();

  const { comments, loading } = useSelector((state: RootState) => ({
    comments: state.comments.commentsByTask[task._id] || [],
    loading: state.comments.loading,
  }));

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentToReply, setCommentToReply] = useState<string | null>(null);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCommentBtnVisible, setIsAddCommentBtnVisible] = useState(true);

  useEffect(() => {
    dispatch(getCommentsRequest(task._id));
  }, [dispatch, task._id]);

  const openReplyModal = (commentId: string) => {
    setCommentToReply(commentId);
    setIsCommentModalOpen(true);
    setIsAddCommentBtnVisible(false);
  };

  const handleCommentAdded = () => {
    dispatch(getCommentsRequest(task._id));
    setIsAddCommentBtnVisible(true);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    dispatch(deleteSubtaskRequest(task._id, subtaskId));
  };

  const handleToggleSubtaskStatus = (subtask: any) => {
    const newStatus = subtask.status === 'Completed' ? 'Queue' : 'Completed';
    dispatch(updateSubtaskStatusRequest(task._id, subtask._id, newStatus));
  };

  const handleDeleteFile = (fileId: string) => {
    dispatch(deleteFileRequest(task._id, fileId));
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.header}>
        <div className={styles.taskId}>#{task._id}</div>
        <div className={styles.actions}>
          <button
            onClick={handleEditClick}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Редактировать
          </button>
          <button
            onClick={() => onDelete(task._id)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Удалить
          </button>
        </div>
      </div>

      <div className={styles.title}>
        <div className={styles.titleGpoup}>
          <p className={styles.Tasktitle}>{task.title}</p>
        </div>
        <p className={styles.priority}>Приоритет: {task.priority}</p>
      </div>
      <p className={styles.description}>{task.description}</p>

      <TaskFileDisplay task={task} handleDeleteFile={handleDeleteFile} />

      {loading ? (
        <p>Загрузка комментариев...</p>
      ) : (
        <CommentList comments={comments} openReplyModal={openReplyModal} />
      )}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        taskId={task._id}
        parentCommentId={commentToReply || undefined}
        onCommentAdded={handleCommentAdded}
      />
      {isAddCommentBtnVisible && (
        <button
          className={styles.addCommentBtn}
          onClick={() => setIsCommentModalOpen(true)}
          style={{ display: isCommentModalOpen ? 'none' : 'block' }}
        >
          Добавить комментарий
        </button>
      )}
      <div className={styles.buttonsGroup}>
        <button onClick={() => setShowSubtasks((prev) => !prev)}>
          {showSubtasks ? 'Скрыть подзадачи' : 'Показать подзадачи'}
        </button>
        <TaskFileUpload taskId={task._id} />
      </div>

      <SubtasksSection
        task={task}
        showSubtasks={showSubtasks}
        handleToggleSubtaskStatus={handleToggleSubtaskStatus}
        handleDeleteSubtask={handleDeleteSubtask}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={task}
      />
    </div>
  );
};

export default TaskItem;
