import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ProjectsPage.module.scss';
import { RootState } from '@redux/store';
import ProjectList from '@components/Project/ProjectList/ProjectList';
import ProjectModal from '@components/Modals/ProjectModal/ProjectModal';
import { Project } from '@types/projectTypes';
import { createProject, fetchProjects } from '@redux/actions/projectActions';

const ProjectsPage: React.FC = () => {
  const dispatch = useDispatch();

  const { projects, loading, error } = useSelector(
    (state: RootState) => state.projects,
  );

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const openProjectModalForCreate = () => {
    setProjectToEdit(undefined);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setProjectToEdit(undefined);
  };

  const handleProjectSubmit = (
    projectData: Omit<Project, 'id' | 'createdAt'>,
    id?: string,
  ) => {
    if (id) {
    } else {
      dispatch(createProject(projectData));
    }
    closeProjectModal();
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.heading}>
        <h1>Управление проектами</h1>
        <p className={styles.description1}>
          Этот сервис предоставляет удобные инструменты для эффективного
          управления проектами в вашей команде.
        </p>
        <p className={styles.description2}>
          Здесь вы можете создать новые проекты, редактировать существующие и
          отслеживать их прогресс.
        </p>
        <p className={styles.description3}>
          Процесс управления проектами становится простым и интуитивно понятным
          благодаря нашему интерфейсу.
        </p>
      </div>

      <button
        onClick={openProjectModalForCreate}
        disabled={loading}
        className={styles.addButton}
      >
        {loading ? 'Загрузка...' : 'Добавить новый проект'}
      </button>

      {loading && <p className={styles.loadingText}>Загрузка проектов...</p>}
      {error && <p className={styles.error}>Ошибка: {error}</p>}

      <ProjectList projects={projects} />

      {isProjectModalOpen && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={closeProjectModal}
          onSubmit={handleProjectSubmit}
          initialProject={projectToEdit}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
