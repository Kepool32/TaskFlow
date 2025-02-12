import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCommentsByTask = async (taskId: any) => {
  const response = await axios.get(`${API_BASE_URL}/comments/${taskId}`);
  return response.data;
};

export const createComment = async (
  taskId: any,
  text: any,
  parentCommentId: any,
) => {
  const response = await axios.post(`${API_BASE_URL}/comments/${taskId}`, {
    text,
    parentCommentId,
  });
  return response.data;
};
