import { FC, useRef } from 'react';
import styles from './book-section.module.scss';
import { FetchedBook } from '../../../types/data.types';
import { SliderImages } from '../../entities';

interface IProps {
  book: FetchedBook;
}

export const BookSection: FC<IProps> = ({ book }) => {
  const bookRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={bookRef} className={styles.book}>
      <div className={styles.book__header}>
        <div className={styles.images}>
          <SliderImages images={book?.images} />
        </div>
        <div className={styles.book_info}>
          <h3 data-test-id='book-title' className={styles.book__title}>{book?.title}</h3>
          <p className={styles.book__author}>
            {book?.authors && book.authors.map((author, index) => (index !== 0 ? `${author}, ` : `${author}`))},{' '}
            {book?.issueYear}
          </p>
          <button
            type='button'
            className={
              book?.delivery
                ? `${styles.book__action} ${styles.book__action__delivery}`
                : book?.booking
                ? `${styles.book__action} ${styles.book__action__booking}`
                : styles.book__action
            }
          >
            {book?.delivery
              ? `ЗАНЯТА ДО ${book?.delivery?.dateHandedFrom}`
              : book?.booking
              ? 'ЗАБРОНИРОВАНА'
              : 'ЗАБРОНИРОВАТЬ'}
          </button>
          <div className={styles.book__header__desc}>
            <h5>О книге</h5>
            <p>{book?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.book__footer}>
        <h5>О книге</h5>
        <p className={styles.book__description}>{book?.description}</p>
      </div>
    </div>
  );
};
