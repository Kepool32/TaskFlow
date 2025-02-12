import React from 'react';
import styles from './SubtasksSection.module.scss';
import TaskSubtaskForm from '../TaskSubtaskForm/TaskSubtaskForm.tsx';

interface SubtasksSectionProps {
  task: any;
  showSubtasks: boolean;
  handleToggleSubtaskStatus: (subtask: any) => void;
  handleDeleteSubtask: (subtaskId: string) => void;
}

const SubtasksSection: React.FC<SubtasksSectionProps> = ({
  task,
  showSubtasks,
  handleToggleSubtaskStatus,
  handleDeleteSubtask,
}) => {
  return (
    <div className={styles.subtasksSection}>
      {showSubtasks && (
        <div className={styles.subtasksContainer}>
          {task.subtasks && task.subtasks.length > 0 ? (
            <ul className={styles.subtaskList}>
              {task.subtasks.map((subtask: any) => (
                <li key={subtask._id} className={styles.subtaskItem}>
                  <span className={styles.subtaskText}>{subtask.title}</span>
                  <div className={styles.subtaskStatus}>
                    <span
                      className={`${styles.statusCircle} ${
                        subtask.status === 'Completed'
                          ? styles.statusCompleted
                          : styles.statusNotCompleted
                      }`}
                    ></span>
                  </div>
                  <div className={styles.subtaskActions}>
                    <button onClick={() => handleDeleteSubtask(subtask._id)}>
                      Удалить
                    </button>
                    <button onClick={() => handleToggleSubtaskStatus(subtask)}>
                      {subtask.status === 'Completed'
                        ? 'Снять отметку'
                        : 'Выполнено'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет подзадач</p>
          )}

          <TaskSubtaskForm taskId={task._id} />
        </div>
      )}
    </div>
  );
};

export default SubtasksSection;
