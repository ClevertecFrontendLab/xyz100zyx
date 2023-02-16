import { FC } from 'react';
import { FetchedBooks } from '../../../../types/data.types';
import { Rating } from '../../rating/rating';
import styles from './book-card.module.scss';
import unbookImg from '../../../../assets/unbook-img.jpg';
import { BookButton } from '../../../book-button/book-button';
import { getDeliveredDate } from '../../../../utils/date.utils';
import { HOST } from '../../../../utils/constants';

interface IProps {
  book: FetchedBooks;
}

export const BookCardFW: FC<IProps> = ({ book }) => (
  <div className={styles.card}>
    <img className={styles.card__img} src={book.image?.url ? `${HOST}${book.image?.url}` : unbookImg} alt='book' />
    <div className={styles.card__right}>
      <p className={styles.card__title}>{book.title}</p>
      <p className={styles.card__authors}>
        {book.authors.map((author, index) =>
          index === 0 ? (
            <span className={styles.author}>{author}</span>
          ) : (
            <span className={styles.author}>, {author}</span>
          )
        )}
        , {book.issueYear}
      </p>
      <div className={styles.card__bottom}>
        <div className={styles.card__rating}>
          {book.rating ? <Rating rating={book.rating} /> : <p>ещё нет оценок</p>}
        </div>
        <BookButton
          text={
            book.booking?.order
              ? 'ЗАБРОНИРОВАНА'
              : !book.delivery?.handed
              ? 'ЗАБРОНИРОВАТЬ'
              : `ЗАНЯТА ДО ${getDeliveredDate(book.delivery?.dateHandedTo)}`
          }
          type={
            !book.booking?.order && !book.delivery?.handed
              ? 'available'
              : book.delivery?.handed
              ? 'unavailable'
              : 'added'
          }
          displayType='vertical'
        />
      </div>
    </div>
  </div>
);
