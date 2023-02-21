import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavMenu } from '../..';
import styles from './burger-nav.module.scss';
import { RootState } from '../../../store/store';

export const BurgerNav: FC = () => {
  const isBurgerMenu = useSelector((state: RootState) => state.popup.burgerNav);

  return (
    <div
      data-test-id='burger-navigation'
      className={!isBurgerMenu ? `${styles.navigation}` : `${styles.navigation} ${styles.navigation__visible}`}
    >
      <div className={styles.navigation__wrapper}>
        <NavMenu
          dataTestIdBooks='burger-books'
          dataTestIdShowcase='burger-showcase'
          dataTestIdContract='burger-contract'
          dataTestIdTerms='burger-terms'
          dataTestIdLinksPrefix='burger'
          dataTestIdCountPrefix='burger-book-count-for'
        />
      </div>
      <span className={styles.navigation__divider} />
      <div className={`${styles.navigation__auth} ${styles.navigation__wrapper}`}>
        <Link to='/'>Профиль</Link>
        <Link to='/'>Выход</Link>
      </div>
    </div>
  );
};
