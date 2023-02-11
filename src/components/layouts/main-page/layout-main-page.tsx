import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout-main-page.module.scss';
import { NavMenu } from '../..';

export const LayoutMainPage: FC = () => (
  <div className={styles.layout}>
    <div className={styles.layout__nav}>
      <NavMenu
        dataTestIdBooks='navigation-books'
        dataTestIdContract='navigation-contract'
        dataTestIdShowcase='navigation-showcase'
        dataTestIdTerms='navigation-terms'
      />
    </div>
    <Outlet />
  </div>
);
