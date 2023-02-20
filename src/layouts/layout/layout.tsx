import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Header, Footer } from '../../components';
import { ModalWindow } from '../../components/popups/modal-window';

export const Layout: FC = () => (
  <div className={styles.layout}>
    <Header />
    <Outlet />
    <Footer />
    <ModalWindow />
  </div>
);
