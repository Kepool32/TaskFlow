import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './TasksPage.module.scss';
import { RootState } from '@redux/store';
import { Task } from '@types/taskTypes';
import {
  createTaskRequest,
  deleteTask,
  fetchTasks,
} from '@redux/actions/taskActions';
import TaskForm from '@components/Task/TaskForm/TaskForm';
import TaskDragDrop from '@components/DragDrop/TaskDragDrop';
import TaskSearch from '@components/Task/TaskSearch/TaskSearch.tsx';

const TasksPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string; name: string }>();
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { tasks, searchQuery } = useSelector((state: RootState) => ({
    tasks: state.tasks.tasks.filter(
      (task: Task) => task.projectId === projectId,
    ),
    searchQuery: state.tasks.searchQuery,
  }));

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasks(projectId));
    }
  }, [projectId, dispatch]);

  const filteredTasks = tasks.filter(
    (task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task._id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleTaskSubmit = (task: Task) => {
    const newTask = { ...task, projectId: projectId || '' };
    dispatch(createTaskRequest(newTask));
    setIsFormOpen(false);
  };

  const handleTaskDelete = (taskId: string) => {
    dispatch(deleteTask({ taskId, projectId }));
  };

  const handleBackToRoot = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.tasksPage}>
      <button className={styles.backButton} onClick={handleBackToRoot}>
        Вернуться в назад
      </button>

      <div className={styles.buttons}>
        <TaskSearch />

        <button
          className={styles.createTaskButton}
          onClick={() => setIsFormOpen(true)}
        >
          + Создать таску
        </button>
      </div>

      {isFormOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <TaskForm onSubmit={handleTaskSubmit} projectId={projectId} />
          </div>
        </div>
      )}

      <TaskDragDrop
        tasks={filteredTasks}
        onDelete={handleTaskDelete}
        projectId={projectId}
      />
    </div>
  );
};

export default TasksPage;
