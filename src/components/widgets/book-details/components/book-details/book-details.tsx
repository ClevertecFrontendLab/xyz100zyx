import { FC } from 'react';
import { FetchedBook } from '../../../../../types/data.types';
import { BookDetailsList } from '../details-list/details-list';
import styles from './book-details.module.scss';

interface IProps{
    book: FetchedBook;
}

export const BookDetails: FC<IProps> = ({book}) => (
    <div className={styles.detailed}>
      <h5 className={styles.section__label}>Подробная иформация</h5>
      <BookDetailsList book={book} />
    </div>
  );
