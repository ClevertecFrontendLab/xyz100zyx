import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import styles from './books-list.module.scss';
import { BookCardReg, BookCardFW } from '../common';
import { DisplayType } from '../types';
import { fetchBooks } from '../../store/slices/books/book-slice';

interface IProps {
  displayTemplate: DisplayType;
}

export const BooksList: FC<IProps> = ({ displayTemplate }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const { status, error, books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {status === 'fulfilled' && (
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
