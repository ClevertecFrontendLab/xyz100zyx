import { FC } from 'react';
import { Book } from '../../../../types/data.types';
import { Rating } from '../../rating/rating';
import styles from './book-card.module.scss';
import unbookImg from '../../../../assets/unbook-img.jpg';
import {BookButton} from "../../../book-button/book-button";

interface IProps {
  book: Book;
}

export const BookCardFW: FC<IProps> = ({ book }) => (
  <div className={styles.card}>
    <img className={styles.card__img} src={book.picture.length ? book.picture[0] : unbookImg} alt='book' />
    <div className={styles.card__right}>
      <p className={styles.card__title}>{book.title}</p>
      <p className={styles.card__authors}>
        {book.author.map((author, index) =>
          index === 0 ? (
            <span className={styles.author}>{author}</span>
          ) : (
            <span className={styles.author}>, {author}</span>
          )
        )}
        , {book.year}
      </p>
      <div className={styles.card__bottom}>
        <div className={styles.card__rating}>
          {book.rating ? <Rating rating={book.rating} /> : <p>ещё нет оценок</p>}
        </div>
          <BookButton text={book.inCard ? 'ЗАБРОНИРОВАНА' : book.isAvailable ? 'ЗАБРОНИРОВАТЬ' : book.busyUntil || ''}  type={(book.isAvailable && !book.inCard) ? 'available' : book.busyUntil ? 'unavailable': 'added'} displayType='vertical' />
      </div>
    </div>
  </div>
);
