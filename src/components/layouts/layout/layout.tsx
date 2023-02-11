import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Header, Footer } from '../..';
import { ModalWindow } from '../../popups/modal-window';
import { BurgerNav } from '../../popups/burger-nav';
import { RootState } from '../../../store/store';

export const Layout: FC = () => {
  const isBurgerNavOpen = useSelector((state: RootState) => state.popup.burgerNav);

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
      <ModalWindow isVisible={isBurgerNavOpen}>
        <BurgerNav />
      </ModalWindow>
    </div>
  );
};
