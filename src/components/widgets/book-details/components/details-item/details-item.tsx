import { FC } from 'react';
import styles from './details-item.module.scss';

interface IProps {
  key: string;
  value: string;
}

export const BookDetailsItem: FC<IProps> = ({ key, value }) => (
  <li>
    <span className={styles.detailed__key}>{key}</span>
    <span className={styles.detailed__value}>{value}</span>
  </li>
);
