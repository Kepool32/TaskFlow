import React, { useState, useEffect } from 'react';
import styles from './ProjectModal.module.scss';
import { Project } from '@types/projectTypes';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt'>, id?: string) => void;
  initialProject?: Project;
  loading?: boolean;
  error?: string | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProject,
  loading,
  error,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialProject) {
      setName(initialProject.name);
      setDescription(initialProject.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialProject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit(
      {
        name,
        description,
        _id: '',
      },
      initialProject?._id,
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{initialProject ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project Name"
            disabled={loading}
          />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            disabled={loading}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttons}>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : initialProject ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
