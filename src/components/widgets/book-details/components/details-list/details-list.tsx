import { FC } from 'react';
import { FetchedBook } from '../../../../../types/data.types';
import styles from './details-list.module.scss';

interface IProps {
  book: FetchedBook;
}

export const BookDetailsList: FC<IProps> = ({ book }) => (
  <div className={styles.detailed__info}>
    <ul className={styles.detailed__left}>
      <li>
        <span className={styles.detailed__key}>Издательство</span>
        <span className={styles.detailed__value}>{book?.publish}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Год издания</span>
        <span className={styles.detailed__value}>{book?.issueYear}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Страниц</span>
        <span className={styles.detailed__value}>{book?.pages}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Переплёт</span>
        <span className={styles.detailed__value}>{book?.cover}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Формат</span>
        <span className={styles.detailed__value}>{book?.format}</span>
      </li>
    </ul>
    <ul className={styles.detailed__right}>
      <li>
        <span className={styles.detailed__key}>Жанр</span>
        <span className={styles.detailed__value}>{book?.categories[0]}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Вес</span>
        <span className={styles.detailed__value}>{book?.weight} г</span>
      </li>
      <li>
        <span className={styles.detailed__key}>ISBN</span>
        <span className={styles.detailed__value}>{book?.ISBN}</span>
      </li>
      <li>
        <span className={styles.detailed__key}>Изготовитель</span>
        <span className={styles.detailed__value}>{book?.producer}</span>
      </li>
    </ul>
  </div>
);
