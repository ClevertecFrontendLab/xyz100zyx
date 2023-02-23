import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './select.module.scss';
import selectIconDesc from '../../../assets/icon_sort.svg';
import selectIconAsc from '../../../assets/icon_sort_asc.svg';
import { RootState } from '../../../store/store';
import { toggleSortedType } from '../../../store/slices/filter/filter-slice';
import { SortType } from '../../../store/slices/filter/filter.types';

interface IProps {
  mobileOpen?: boolean;
}

export const Select: FC<IProps> = ({ mobileOpen }) => {
  const dispatch = useDispatch();
  const sortedType = useSelector((state: RootState) => state.filter.sortedType);

  const onSortButtonClick = () => {
    dispatch(toggleSortedType());
  };

  return (
    <div
      role='presentation'
      onClick={onSortButtonClick}
      className={!mobileOpen ? styles.select : `${styles.select} ${styles.select__mob}`}
    >
      <img src={sortedType === SortType.DESC ? selectIconDesc : selectIconAsc} alt='sort icon' />
      <span role='presentation' data-test-id='sort-rating-button'>
        По рейтингу
      </span>
    </div>
  );
};
