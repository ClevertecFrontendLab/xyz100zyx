import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './books-list.module.scss';
import { BookCardReg, BookCardFW } from '../common';
import { DisplayType } from '../types';
import { fetchBooks } from '../../store/slices/books/async-actions';
import { useThunkDispatch } from '../../hooks/redux/dispatchers';

interface IProps {
  displayTemplate: DisplayType;
}

export const BooksList: FC<IProps> = ({ displayTemplate }) => {
  const dispatch = useThunkDispatch();
  const { status, books } = useSelector((state: RootState) => state.books);
  const statusCategories = useSelector((state: RootState) => state.nav.status);


  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {status === 'fulfilled' && statusCategories === 'fulfilled' && (
        <ul className={displayTemplate === 'linear' ? `${styles.list}` : `${styles.list} ${styles.list_list}`}>
          {books.map((book) =>
            displayTemplate === 'linear' ? (
              <BookCardReg key={book.id} book={book} />
            ) : (
              <BookCardFW key={book.id} book={book} />
            )
          )}
        </ul>
      )}
    </>
  );
};
