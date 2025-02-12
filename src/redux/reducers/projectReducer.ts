import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  CREATE_PROJECT,
  DELETE_PROJECT,
} from '../actions/projectActions';
import { ProjectActionTypes, ProjectState } from '@types/projectTypes.ts';

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectReducer = (
  state = initialState,
  action: ProjectActionTypes,
) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, loading: true, error: null };

    case FETCH_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.payload };

    case FETCH_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((p) => p._id !== action.payload),
      };

    default:
      return state;
  }
};
