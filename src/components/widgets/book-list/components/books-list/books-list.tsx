import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import styles from './books-list.module.scss';
import { BookCardReg, BookCardFW } from '../../../../entities';
import { DisplayType } from '../../../../types';
import { fetchBooks } from '../../../../../store/slices/books/async-actions';
import { useThunkDispatch } from '../../../../../hooks/redux/dispatchers';
import { FetchedBooks } from '../../../../../types/data.types';
import { sort } from '../../../../../store/slices/books/book-slice';

interface IProps {
  displayTemplate: DisplayType;
}

export const BooksList: FC<IProps> = ({ displayTemplate }) => {
  const unfilteredBooks = useSelector((state: RootState) => state.books.books);
  const [books, setBooks] = useState<FetchedBooks[]>([]);
  const { activeGenre, genres } = useSelector((state: RootState) => state.nav);

  const dispatch = useThunkDispatch();
  const { status, sortedType } = useSelector((state: RootState) => state.books);
  const statusCategories = useSelector((state: RootState) => state.nav.status);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    let sortedBooks;

    if (sortedType === sort.ASC) {
      sortedBooks = [...unfilteredBooks].sort((cur, next) =>
        !cur.rating && !next.rating ? -1 : !cur.rating ? -1 : !next.rating ? 1 : cur.rating - next.rating ? cur.rating - next.rating : -1
      );
    } else {
      sortedBooks = [...unfilteredBooks].sort((cur, next) =>
        !cur.rating && !next.rating ? -1 : !cur.rating ? 1 : !next.rating ? -1 : cur.rating - next.rating ? next.rating - cur.rating : -1
      );
    }

    if (activeGenre !== 0) {
      const activeGenreName = genres.find((item) => item.id === activeGenre)?.name;
      const filteredBooks = sortedBooks.filter((book) => book.categories.includes(activeGenreName!));
      setBooks(filteredBooks);
    } else {
      setBooks(sortedBooks);
    }
  }, [activeGenre, genres, unfilteredBooks, sortedType]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {status === 'fulfilled' &&
        statusCategories === 'fulfilled' &&
        (books.length ? (
          <ul className={displayTemplate === 'linear' ? `${styles.list}` : `${styles.list} ${styles.list_list}`}>
            {books.map((book) =>
              displayTemplate === 'linear' ? (
                <BookCardReg key={book.id} book={book} />
              ) : (
                <BookCardFW key={book.id} book={book} />
              )
            )}
          </ul>
        ) : (
          <span className={styles.non_search}>В этой категории книг ещё нет</span>
        ))}
    </>
  );
};
