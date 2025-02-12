import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSubtaskRequest } from '@redux/actions/taskActions';
import styles from './TaskSubtaskForm.module.scss'; // Import the CSS module

interface TaskSubtaskFormProps {
  taskId: string;
}

const TaskSubtaskForm: React.FC<TaskSubtaskFormProps> = ({ taskId }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(createSubtaskRequest(taskId, { title }));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Название подзадачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton}>
        Добавить подзадачу
      </button>
    </form>
  );
};

export default TaskSubtaskForm;
