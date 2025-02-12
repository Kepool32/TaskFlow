import React, { useMemo, useRef, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import TaskItem from '../Task/TaskItem/TaskItem';
import { Task } from '@types/taskTypes.ts';
import styles from './TaskDragDrop.module.scss';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '@redux/actions/taskActions.ts';

interface TaskDragDropProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  projectId?: string;
}

const TaskDragDrop: React.FC<TaskDragDropProps> = ({
  tasks,
  onDelete,
  projectId,
}) => {
  const dispatch = useDispatch();
  const columnsContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const columns = useMemo(
    () => ({
      Queue: 'Queue',
      Development: 'Development',
      Done: 'Done',
    }),
    [],
  );

  const getColumnTasks = (column: string) => {
    const filtered = tasks.filter(
      (task) =>
        task.status === column && (!projectId || task.projectId === projectId),
    );
    const priorityOrder: { [key: string]: number } = {
      Low: 3,
      Medium: 2,
      High: 1,
    };
    return [...filtered].sort(
      (a, b) =>
        (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0),
    );
  };

  const isValidStatus = (
    status: string,
  ): status is 'Queue' | 'Development' | 'Done' => {
    return ['Queue', 'Development', 'Done'].includes(status);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    if (isValidStatus(newStatus)) {
      const task = tasks.find((task) => task._id === draggableId);
      if (task) {
        const updatedTask = { ...task, status: newStatus };
        dispatch(updateTaskStatus(updatedTask));
      }
    } else {
      console.error(`Invalid status: ${newStatus}`);
    }

    setIsDragging(false);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (isDragging && columnsContainerRef.current) {
      const container = columnsContainerRef.current;
      const { clientX } = e instanceof MouseEvent ? e : e.touches[0];

      const threshold = 50;
      if (clientX > container.getBoundingClientRect().right - threshold) {
        container.scrollLeft += 10;
      } else if (clientX < container.getBoundingClientRect().left + threshold) {
        container.scrollLeft -= 10;
      }
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('touchmove', handleDragMove);
    } else {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
    };
  }, [isDragging]);

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.columnsContainer} ref={columnsContainerRef}>
        {Object.entries(columns).map(([columnKey, columnTitle]) => (
          <Droppable droppableId={columnKey} key={columnKey}>
            {(provided) => (
              <div
                className={styles.column}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>{columnTitle}</h2>
                <div
                  className={styles.taskList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {getColumnTasks(columnKey).map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`${styles.taskItemWrapper} ${snapshot.isDragging ? styles.dragging : ''}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem task={task} onDelete={onDelete} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskDragDrop;
