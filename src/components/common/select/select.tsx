import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './select.module.scss';
import selectIconDesc from '../../../assets/icon_sort.svg';
import selectIconAsc from '../../../assets/icon_sort_asc.svg';
import { RootState } from '../../../store/store';
import { sort, toggleSortedType } from '../../../store/slices/books/book-slice';

interface IProps {
  mobileOpen?: boolean;
}

export const Select: FC<IProps> = ({ mobileOpen }) => {
  const dispatch = useDispatch()
  const sortedType = useSelector((state: RootState) => state.books.sortedType)

  const onSortButtonClick = () => {
    dispatch(toggleSortedType())
  }

  return (
    <div role='presentation' onClick={onSortButtonClick} className={!mobileOpen ? styles.select : `${styles.select} ${styles.select__mob}`}>
      <img src={sortedType === sort.DESC ? selectIconDesc : selectIconAsc} alt='sort icon' />
      <span>По рейтингу</span>
    </div>
  );
};
