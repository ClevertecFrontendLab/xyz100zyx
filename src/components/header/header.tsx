import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserCard } from '../common';
import { toggle } from '../../store/slices/popup/burger-popup';
import styles from './header.module.scss';
import logo from '../../assets/logo.svg';
import { RootState } from '../../store/store';
import { changeActiveGenre } from '../../store/slices/nav/nav-slice';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const isBurgerNavOpen = useSelector((state: RootState) => state.popup.burgerNav);
  
  return (
    <header className={styles.header}>
      <Link to='/'>
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
