import React from 'react';
import styles from './ProjectList.module.scss';
import { Project } from '@types/projectTypes.ts';
import ProjectItem from '../ProjectItem/ProjectItem.tsx'; // подключаем стили через модули

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className={styles.projectList}>
      {projects.map((project: Project) => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
