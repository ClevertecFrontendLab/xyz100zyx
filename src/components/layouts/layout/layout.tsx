import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Header, Footer } from '../..';
import { ModalWindow } from '../../popups/modal-window';
import { BurgerNav } from '../../popups/burger-nav';
import { RootState } from '../../../store/store';
import { ErrorPopup } from '../../popups/error/error';

export const Layout: FC = () => {
  const isBurgerNavOpen = useSelector((state: RootState) => state.popup.burgerNav);
  const isErrorOpen = useSelector((state: RootState) => state.books.openErrorPop);

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
      <ModalWindow>
        {isBurgerNavOpen === true ? (<BurgerNav />) : <ErrorPopup text="Что-то пошло не так. Обновите страницу через некоторое время."/>}
      </ModalWindow>
    </div>
  );
};
