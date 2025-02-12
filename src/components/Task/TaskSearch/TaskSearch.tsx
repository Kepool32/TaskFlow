import React from 'react';

import styles from './TaskSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store.ts';
import { updateSearchQuery } from '@redux/actions/taskActions.ts';

const TaskSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск по номеру или заголовку задачи..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default TaskSearch;
