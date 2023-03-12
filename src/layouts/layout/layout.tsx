import {FC} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import styles from './layout.module.scss';
import {Header, Footer} from '../../components';
import {ModalWindow} from '../../components/popups/modal-window';

export const Layout: FC = () => (
    localStorage.getItem('token') ? <div className={styles.layout}>
        <Header/>
        <Outlet/>
        <Footer/>
        <ModalWindow/>
    </div> : <Navigate to='/auth'/>
);
