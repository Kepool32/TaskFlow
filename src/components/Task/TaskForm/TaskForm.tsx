import React, { useState } from 'react';
import styles from './TaskForm.module.scss';
import {Task} from "@types/taskTypes.ts";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  projectId: string | undefined;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, projectId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTask = {
      title: name,
      description,
      status: 'Queue',
      projectId: projectId || '',
      priority,
    };

    onSubmit(newTask);
    setName('');
    setDescription('');
    setPriority('Low');
  };

  return (
      <form onSubmit={handleSubmit} className={styles.taskForm}>
          <input
              type="text"
              placeholder="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
          <div className={styles.priorityItem}>
              <label htmlFor="priority" className={styles.label}>Приоритет:</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
              </select>

          </div>
          <button type="submit">Create Task</button>
      </form>
  );
};

export default TaskForm;
