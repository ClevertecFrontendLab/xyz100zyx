import { FC, useRef, useState } from 'react';
import styles from './book-section.module.scss';
import { Book } from '../../types/data.types';
import { SliderImages } from '../swiper';

interface IProps {
  book: Book;
}

export const BookSection: FC<IProps> = ({ book }) => {
  const bookRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={bookRef} className={styles.book}>
      <div className={styles.book__header}>
        <div className={styles.images}>
          <SliderImages images={book.picture} />
        </div>
        <div className={styles.book_info}>
          <h3 className={styles.book__title}>
            Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
          </h3>
          <p className={styles.book__author}>Адитья Бхаргава, 2019</p>
          <button type='button' className={styles.book__action}>
            ЗАБРОНИРОВАТЬ
          </button>
          <div className={styles.book__header__desc}>
            <h5>О книге</h5>
            <p>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время?
              <br />
              <br />
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
              алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.book__footer}>
        <h5>О книге</h5>
        <p className={styles.book__description}>
          Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
          решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить
          многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?
          <br />
          <br />
          Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
          алгоритмы — это веселое и увлекательное занятие.
        </p>
      </div>
    </div>
  );
};
