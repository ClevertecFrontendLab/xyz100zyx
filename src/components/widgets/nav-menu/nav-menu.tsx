import { FC, MouseEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActiveDirectory,
  changeActiveGenre,
  toggleGenresVisibility,
  setGenresVisibility,
} from '../../../store/slices/nav/nav-slice';
import { fetchGenres } from '../../../store/slices/nav/async-actions';
import { close } from '../../../store/slices/popup/burger-slice';
import styles from './nav-menu.module.scss';
import { ReactComponent as IconChevronVisible } from '../../../assets/icon_chevron_visible.svg';
import { ReactComponent as IconChevronHidden } from '../../../assets/nav_menu_chevron.svg';
import { RootState } from '../../../store/store';
import { fetchBooks } from '../../../store/slices/books/async-actions';
import { useThunkDispatch } from '../../../hooks/redux/dispatchers';
import { getCategoryCount } from '../../../utils/categories.utils';

interface IProps {
  dataTestIdShowcase: string;
  dataTestIdBooks: string;
  dataTestIdTerms: string;
  dataTestIdContract: string;
}

export const NavMenu: FC<IProps> = ({ dataTestIdBooks, dataTestIdContract, dataTestIdShowcase, dataTestIdTerms }) => {
  const { activeGenre, activeDirectory, isHiddenGenres, genres, status } = useSelector((state: RootState) => state.nav);
  const statusBooks = useSelector((state: RootState) => state.books.status);
  const books = useSelector((state: RootState) => state.books.books);

  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const navigate = useNavigate();

  const onLinkClick = (index: number) => {
    dispatch(changeActiveDirectory(0));
    dispatch(changeActiveGenre(index));
    thunkDispatch(fetchBooks());
    dispatch(close());
  };

  const onDirClick = (index: number) => {
    dispatch(changeActiveDirectory(index));

    if (index === 0) {
      dispatch(changeActiveGenre(0));
      navigate('/books/all');
      dispatch(toggleGenresVisibility());
    }

    if (index !== 0) {
      dispatch(setGenresVisibility(true));
      dispatch(close());
    }
  };

  const onToggleButtonClick = (e: MouseEvent) => {
    dispatch(toggleGenresVisibility());
    e.stopPropagation();
  };

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    let ignore = false;
    if(!ignore){
      thunkDispatch(fetchGenres());
    }

    return () => {
      ignore = true;

    }
  }, []);

  return (
    <div className={styles.menu}>
      <div
        data-test-id={dataTestIdShowcase}
        role='presentation'
        onClick={(e) => onDirClick(0)}
        className={
          activeDirectory === 0
            ? `${styles.menu__label} ${styles.menu__label__first} ${styles.menu__label_active}`
            : `${styles.menu__label}`
        }
      >
        <span>Витрина книг</span>
        {activeDirectory === 0 && status === 'fulfilled' && statusBooks === 'fulfilled' && (
          <button onClick={(e) => onToggleButtonClick(e)} className={styles.menu__btn} type='button'>
            {!isHiddenGenres ? <IconChevronVisible /> : <IconChevronHidden />}
          </button>
        )}
      </div>
      <ul
        className={
          !isHiddenGenres && status === 'fulfilled' && statusBooks === 'fulfilled'
            ? styles.menu__list
            : `${styles.menu__list} ${styles.menu__list__hidden}`
        }
      >
        {genres.map((category, index) => (
          <li
            data-test-id={index === 0 ? dataTestIdBooks : ''}
            role='presentation'
            className={styles.menu__item}
            key={category.id}
            onClick={() => onLinkClick(index)}
            onKeyDown={() => {}}
          >
            <Link className={styles.menu__link} to={`/books/${category.path}`}>
              <span
                className={
                  index === activeGenre && activeDirectory === 0
                    ? `${styles.label} ${styles.label__active}`
                    : styles.label
                }
              >
                {category.name}
                <span className={styles.link__count}>{index !== 0 ? getCategoryCount(category.name, books) : ''}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        data-test-id={dataTestIdTerms}
        to='/terms'
        onClick={() => onDirClick(1)}
        className={
          activeDirectory === 1 ? `${styles.menu__label} ${styles.menu__label_active}` : `${styles.menu__label}`
        }
      >
        Правила пользования
      </Link>
      <Link
        data-test-id={dataTestIdContract}
        to='/contract'
        onClick={() => onDirClick(2)}
        className={
          activeDirectory === 2 ? `${styles.menu__label} ${styles.menu__label_active}` : `${styles.menu__label}`
        }
      >
        Договор оферты
      </Link>
    </div>
  );
};
