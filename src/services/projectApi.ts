import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProjectsFromAPI = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

// Создать проект
export const createProjectAPI = async (project: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, project);
  return response.data;
};

// Удалить проект
export const deleteProjectAPI = async (projectId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
  } catch (error) {
    throw new Error('Не удалось удалить проект');
  }
};
