import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './main-page.module.scss';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { BooksList } from '../../components/books-list/books-list';
import { DisplayType } from '../../components/types';

export const MainPage: FC = () => {
  const [listView, setListView] = useState<DisplayType>('linear');

  const booksStatus = useSelector((state: RootState) => state.books.status);
  const navStatus = useSelector((state: RootState) => state.nav.status);


  return (
    <div className={styles.wrapper}>
      {(booksStatus === 'fulfilled' && navStatus === 'fulfilled') && <FilterBar displayState={listView} onViewManagerClick={setListView} />}
      <BooksList displayTemplate={listView} />
    </div>
  );
};
