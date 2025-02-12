import { Project } from '@types/projectTypes.ts';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const fetchProjects = () => ({ type: FETCH_PROJECTS });

export const fetchProjectsSuccess = (projects: Project[]) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const deleteProject = (projectId: string) => ({
  type: DELETE_PROJECT,
  payload: projectId,
});

export const fetchProjectsError = (error: string) => ({
  type: FETCH_PROJECTS_ERROR,
  payload: error,
});

export const createProject = (project: Project) => ({
  type: CREATE_PROJECT,
  payload: project,
});
