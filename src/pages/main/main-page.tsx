import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './main-page.module.scss';
import { FilterBar } from '../../components/widgets/filter-bar/filter-bar';
import { BooksList } from '../../components/widgets/book-list/components/books-list/books-list';
import { DisplayType } from '../../components/types';
import { useThunkDispatch } from '../../hooks/redux/dispatchers';
import { fetchGenres } from '../../store/slices/nav/async-actions';
import { fetchBooks } from '../../store/slices/books/async-actions';
import useEffectOnce from '../../hooks/use-effect-once';

export const MainPage: FC = () => {
  const [listView, setListView] = useState<DisplayType>('linear');

  const isNeedUpdate = useRef(true);

  const booksStatus = useSelector((state: RootState) => state.books.status);
  const navStatus = useSelector((state: RootState) => state.nav.status);
  const thunkDispatch = useThunkDispatch();

  // useEffect(() => {
  //   if(isNeedUpdate.current === true){
  //       if(navStatus === 'rejected' || navStatus === null){
  //           thunkDispatch(fetchGenres());
  //       }
  //       if(booksStatus === null || booksStatus === 'rejected'){
  //           thunkDispatch(fetchBooks())
  //       }
  //       isNeedUpdate.current = false
  //   }
  //   console.log(navStatus, 'loool', booksStatus)
  // }, [thunkDispatch, booksStatus, navStatus])

  useEffectOnce(() => {
    if (isNeedUpdate.current === true) {
      if (navStatus === 'rejected' || navStatus === null) {
        thunkDispatch(fetchGenres());
      }
      if (booksStatus === null || booksStatus === 'rejected') {
        thunkDispatch(fetchBooks());
      }
      isNeedUpdate.current = false;
    }
  });

  return (
    <div className={styles.wrapper}>
      {booksStatus === 'fulfilled' && navStatus === 'fulfilled' && (
        <FilterBar displayState={listView} onViewManagerClick={setListView} />
      )}
      <BooksList displayTemplate={listView} />
    </div>
  );
};
