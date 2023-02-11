import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../../types/data.types';
import styles from './book-card.module.scss';
import { Rating } from '../../rating/rating';
import unbookImg from '../../../../assets/unbook-img.jpg';
import {BookButton} from "../../../book-button/book-button";

interface IProps {
  book: Book;
}

export const BookCardReg: FC<IProps> = ({ book }) => {

  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/books/all/${book.id}`);
  }

  return (
    <div data-test-id='card' role="presentation" onClick={onCardClick} className={styles.card}>
      <img className={styles.img} src={book.picture.length ? book.picture[0] : unbookImg} alt='the book' />
      <div className={styles.rating}>{book.rating ? <Rating rating={book.rating} /> : <p>ещё нет оценок</p>}</div>
      <div className={styles.card__title}>
        <span>{book.title}</span>
      </div>
      <p className={book.author.length !== 1 ? `${styles.card__authors}` : `${styles.card__authors} ${styles.card__authors_flex}`}>
        {book.author.map((author, index) =>
          index === 0 ? (
            <span key={Math.round(index)} className={styles.author}>{author}</span>
          ) : (
            <span key={Math.round(index)} className={styles.author}>
              ,<br />
              {author}
            </span>
          )
        )}
        , {book.year}
      </p>
        <BookButton text={book.inCard ? 'ЗАБРОНИРОВАНА' : book.isAvailable ? 'ЗАБРОНИРОВАТЬ' : book.busyUntil || ''}  type={(book.isAvailable && !book.inCard) ? 'available' : book.busyUntil ? 'unavailable': 'added'} displayType='linear' />
    </div>
  );
}
