import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadFilesRequest } from '@redux/actions/taskActions';
import styles from './TaskFileUpload.module.scss';

interface TaskFileUploadProps {
  taskId: string;
}

const TaskFileUpload: React.FC<TaskFileUploadProps> = ({ taskId }) => {
  const dispatch = useDispatch();
  const uniqueInputId = `file-upload-${taskId}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    for (const file of e.target.files) {
      formData.append('files', file);
    }
    dispatch(uploadFilesRequest(taskId, formData));
  };

  return (
    <form className={styles.form}>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
        id={uniqueInputId}
      />
      <label htmlFor={uniqueInputId} className={styles.uploadButton}>
        Загрузить файлы
      </label>
    </form>
  );
};

export default TaskFileUpload;
