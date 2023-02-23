import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout-main-page.module.scss';
import { NavMenu } from '../../components/widgets/nav-menu/nav-menu';

export const LayoutMainPage: FC = () => (
  <div className={styles.layout}>
    <div className={styles.layout__nav}>
      <NavMenu
        dataTestIdBooks='navigation-books'
        dataTestIdContract='navigation-contract'
        dataTestIdShowcase='navigation-showcase'
        dataTestIdTerms='navigation-terms'
        dataTestIdLinksPrefix='navigation'
        dataTestIdCountPrefix='navigation-book-count-for'
      />
    </div>
    <Outlet />
  </div>
);
