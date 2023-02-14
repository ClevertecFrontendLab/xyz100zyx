import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchedBooks } from '../../../../types/data.types';
import styles from './book-card.module.scss';
import { Rating } from '../../rating/rating';
import unbookImg from '../../../../assets/unbook-img.jpg';
import {BookButton} from "../../../book-button/book-button";
import { getDeliveredDate } from '../../../../utils/date.utils';

interface IProps {
  book: FetchedBooks;
}

export const BookCardReg: FC<IProps> = ({ book}) => {

  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/books/all/${book.id}`);
  }

  return (
    <div data-test-id='card' role="presentation" onClick={onCardClick} className={styles.card}>
      <img className={styles.img} src={book.image?.url ? `https://strapi.cleverland.by${book.image?.url}` : unbookImg} alt='book' />
      <div className={styles.rating}>{book.rating ? <Rating rating={book.rating} /> : <p>ещё нет оценок</p>}</div>
      <div className={styles.card__title}>
        <span>{book.title}</span>
      </div>
      <p className={book.authors.length !== 1 ? `${styles.card__authors}` : `${styles.card__authors} ${styles.card__authors_flex}`}>
        {book.authors.map((author, index) =>
          index === 0 ? (
            <span key={Math.round(index)} className={styles.author}>{author}</span>
          ) : (
            <span key={Math.round(index)} className={styles.author}>
              ,<br />
              {author}
            </span>
          )
        )}
        , {book.issueYear}
      </p>
        <BookButton text={book.booking?.order ? 'ЗАБРОНИРОВАНА' : !book.delivery?.handed ? 'ЗАБРОНИРОВАТЬ' : `ЗАНЯТА ДО ${getDeliveredDate(book.delivery?.dateHandedTo)}`}  type={(!book.booking?.order && !book.delivery?.handed) ? 'available' : book.delivery?.handed ? 'unavailable': 'added'} displayType='linear' />
    </div>
  );
}
