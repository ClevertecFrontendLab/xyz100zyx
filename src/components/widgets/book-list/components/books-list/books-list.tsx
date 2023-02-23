import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import styles from './books-list.module.scss';
import {BookCardReg, BookCardFW} from '../../../../entities';
import {DisplayType} from '../../../../types';
import {FetchedBooks} from '../../../../../types/data.types';
import {sortBooks} from '../../../../../utils/sort-book.utils';

interface IProps {
    displayTemplate: DisplayType;
}

export const BooksList: FC<IProps> = ({displayTemplate}) => {
    const unfilteredBooks = useSelector((state: RootState) => state.books.books);
    const [books, setBooks] = useState<FetchedBooks[]>([]);
    const {genres} = useSelector((state: RootState) => state.nav);
    const {inputValue, activeGenre} = useSelector((state: RootState) => state.filter);
    const {status} = useSelector((state: RootState) => state.books);
    const {sortedType} = useSelector((state: RootState) => state.filter);
    const statusCategories = useSelector((state: RootState) => state.nav.status);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (status === 'fulfilled' && statusCategories === 'fulfilled') {
            const sortedBooks = sortBooks(activeGenre, sortedType, inputValue, genres, unfilteredBooks);
            setBooks(sortedBooks)
        }
    }, [activeGenre, sortedType, inputValue, unfilteredBooks]);

    /* eslint-disable react/jsx-no-useless-fragment */
    return (
        <>
            {status === 'fulfilled' &&
                statusCategories === 'fulfilled' &&
                (books.length ? (
                    <ul className={displayTemplate === 'linear' ? `${styles.list}` : `${styles.list} ${styles.list_list}`}>
                        {books.map((book) =>
                            displayTemplate === 'linear' ? (
                                <BookCardReg key={book.id} book={book}/>
                            ) : (
                                <BookCardFW key={book.id} book={book}/>
                            )
                        )}
                    </ul>
                ) : inputValue ? (
                    <span data-test-id="search-result-not-found" className={styles.non_search}>
            По запросу ничего не найдено
          </span>
                ) : (
                    <span data-test-id="empty-category" className={styles.non_search}>
            В этой категории книг ещё нет
          </span>
                ))}
        </>
    );
};
