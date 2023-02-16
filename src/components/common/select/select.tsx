import { FC, useState } from 'react';
import styles from './select.module.scss';
import selectIcon from '../../../assets/icon_sort.svg';

interface IProps {
  mobileOpen?: boolean;
}

export const Select: FC<IProps> = ({ mobileOpen }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <div className={!mobileOpen ? styles.select : `${styles.select} ${styles.select__mob}`}>
      <img src={selectIcon} alt='sort icon' />
      <span>По рейтингу</span>
    </div>
  );
};
