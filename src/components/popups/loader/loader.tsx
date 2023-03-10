import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import iconLoader from '../../../assets/loader-icon.svg';
import styles from './loader.module.scss';

export const LoaderWindow: FC = () => {
  const booksStatus = useSelector((state: RootState) => state.books.status);
  const navStatus = useSelector((state: RootState) => state.nav.status);
  const authStatus = useSelector((state: RootState) => state.auth.status)

  return (
    <div
      data-test-id='loader'
      className={
        (booksStatus === 'pending' && navStatus === 'pending') ||
        (booksStatus === 'fulfilled' && navStatus === 'pending') ||
        (booksStatus === 'pending' && navStatus === 'fulfilled') ||
        (booksStatus === 'pending' && navStatus === null) ||
        authStatus === 'pending'
          ? styles.window
          : styles.window__none
      }
    >
      <img src={iconLoader} className={styles.loader} alt='loader' />
    </div>
  );
};
