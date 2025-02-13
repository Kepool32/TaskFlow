import React from 'react';
import styles from './TaskFileDisplay.module.scss';
import { Task } from '@types/taskTypes';

interface TaskFileDisplayProps {
  task: Task;
  handleDeleteFile: (fileId: string) => void;
}

const TaskFileDisplay: React.FC<TaskFileDisplayProps> = ({
  task,
  handleDeleteFile,
}) => {
  const serverUrl = import.meta.env.VITE_API_BASE_URL;

  const getFileExtension = (fileName: string) =>
    fileName.split('.').pop()?.toLowerCase();

  const files = task.files || [];
  const processedFiles = files.map((file: any) => {
    const fileExtension = getFileExtension(file.fileName);
    return {
      ...file,
      fileExtension,
      isImage:
        fileExtension &&
        ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension),
      isVideo: fileExtension && ['mp4', 'webm', 'ogg'].includes(fileExtension),
      isDocument:
        fileExtension &&
        ['doc', 'docx', 'pdf', 'ppt', 'xls'].includes(fileExtension),
      isIcon: fileExtension && ['ico'].includes(fileExtension),
    };
  });

  return (
    <div className={styles.filesSection}>
      {files.length > 0 && (
        <div className={styles.filesContainer}>
          <div className={styles.fileList}>
            {processedFiles.map((file: any) => (
              <div key={file._id} className={styles.fileItem}>
                {file.isImage ? (
                  <img
                    src={`${serverUrl}/${file.url}`}
                    alt={file.fileName}
                    className={styles.fileImage}
                  />
                ) : file.isVideo ? (
                  <video controls className={styles.fileVideo}>
                    <source
                      src={`${serverUrl}/${file.url}`}
                      type={`video/${file.fileExtension}`}
                    />
                    Ваш браузер не поддерживает видео.
                  </video>
                ) : file.isDocument ? (
                  <div className={styles.fileDocument}>
                    <a
                      href={`${serverUrl}/${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName}
                    </a>
                  </div>
                ) : file.isIcon ? (
                  <div className={styles.fileIcon}>
                    <img src={`${serverUrl}/${file.url}`} alt={file.fileName} />
                  </div>
                ) : (
                  <div className={styles.fileOther}>
                    <a
                      href={`${serverUrl}/${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName}
                    </a>
                  </div>
                )}
                <button
                  onClick={() => handleDeleteFile(file._id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFileDisplay;
