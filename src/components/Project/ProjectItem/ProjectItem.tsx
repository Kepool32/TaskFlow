import React from 'react';
import { deleteProject } from '@redux/actions/projectActions';
import styles from './ProjectItem.module.scss';
import { Project } from '@types/projectTypes';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject(project._id));
  };

  return (
    <div className={styles.projectItem}>
      <div className={styles.projectInfo}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className={styles.viewTaskWrapper}>
        <Link to={`/tasks/${project._id}`} className={styles.viewTask}>
          View Tasks
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Удалить проект
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;
