import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserCard } from '../common';
import { toggle } from '../../store/slices/popup/burger-slice';
import styles from './header.module.scss';
import logo from '../../assets/logo.svg';
import { RootState } from '../../store/store';
import {nullableStatus} from '../../store/slices/books/book-slice';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const isBurgerNavOpen = useSelector((state: RootState) => state.popup.burgerNav);

  const onLogoClick = () => {
      dispatch(nullableStatus());
  }

  return (
    <header className={styles.header}>
      <Link onClick={onLogoClick} to='/'>
        <img className={styles.logo} src={logo} alt='logo' />
      </Link>
      <div
        data-test-id='button-burger'
        role='presentation'
        onClick={() => dispatch(toggle())}
        className={!isBurgerNavOpen ? `${styles.burger}` : `${styles.burger} ${styles.burger__active}`}
      >
        <span />
      </div>
      <div className={styles.header_content}>
        <span className={styles.header_page}>Библиотека</span>
        <UserCard />
      </div>
    </header>
  );
};
