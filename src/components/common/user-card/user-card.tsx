import { FC } from 'react';
import styles from './user-card.module.scss';

import avatar from '../../../assets/avatar.jpg';

export const UserCard: FC = () => (
  <div className={styles.card}>
    <span className={styles.hello}>Привет, Ваня</span>
    <img src={avatar} alt='user avatar' />
  </div>
);
