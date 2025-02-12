import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTasksFromAPI = async (projectId: string) => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${projectId}`);
  return response.data;
};

export const createTaskAPI = async (
  projectId: string,
  task: { title: string; description: string },
) => {
  const response = await axios.post(`${API_BASE_URL}/tasks/${projectId}`, task);
  return response.data;
};

export const updateTaskAPI = async (taskId: string, task: any) => {
  if (!taskId) {
    throw new Error('taskId не найден');
  }
  const { status } = task;

  if (!['Queue', 'Development', 'Done'].includes(status)) {
    throw new Error('Некорректный статус задачи');
  }

  const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTaskAPI = async ({
  taskId,
  projectId,
}: {
  taskId: string;
  projectId: string;
}) => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}?projectId=${projectId}`);
};

export const uploadFilesToTaskAPI = async (
  taskId: string,
  formData: FormData,
) => {
  const response = await axios.post(
    `${API_BASE_URL}/tasks/${taskId}/files`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const updateSubtaskStatusAPI = async (
  taskId: string,
  subtaskId: string,
  status: string,
) => {
  const response = await axios.patch(
    `${API_BASE_URL}/tasks/${taskId}/subtask/${subtaskId}`,
    { status },
  );
  return response.data;
};

// Удалить подзадачу
export const deleteSubtaskAPI = async (taskId: string, subtaskId: string) => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}/subtask/${subtaskId}`);
};

export const createSubtaskAPI = async (
  taskId: string,
  subtask: {
    title: string;
    status?: string;
    description?: string;
    dueDate?: string;
  },
) => {
  const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/subtask`, {
    title: subtask.title,
    status: subtask.status || 'Queue',
    description: subtask.description || '',
    dueDate: subtask.dueDate || null,
  });

  return response.data;
};

export const deleteFileFromTaskAPI = async (taskId: string, fileId: string) => {
  const response = await axios.delete(
    `${API_BASE_URL}/tasks/${taskId}/file/${fileId}`,
  );
  return response.data;
};
