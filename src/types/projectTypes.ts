import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECTS,
  FETCH_PROJECTS_ERROR,
  FETCH_PROJECTS_SUCCESS,
} from '../redux/actions/projectActions.ts';

export interface Project {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface FetchProjectsAction {
  type: typeof FETCH_PROJECTS;
}

interface FetchProjectsSuccessAction {
  type: typeof FETCH_PROJECTS_SUCCESS;
  payload: Project[];
}

interface FetchProjectsErrorAction {
  type: typeof FETCH_PROJECTS_ERROR;
  payload: string;
}

interface CreateProjectAction {
  type: typeof CREATE_PROJECT;
  payload: Project;
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: string;
}
export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export type ProjectActionTypes =
  | FetchProjectsAction
  | FetchProjectsSuccessAction
  | FetchProjectsErrorAction
  | CreateProjectAction
  | DeleteProjectAction;
