import { FC, MouseEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActiveDirectory,
  changeActiveGenre,
  toggleGenresVisibility,
  setGenresVisibility,
} from '../../store/slices/nav/nav-slice';
import { close } from '../../store/slices/popup/popup-slice';
import styles from './nav-menu.module.scss';
import { ReactComponent as IconChevronVisible } from '../../assets/icon_chevron_visible.svg';
import { ReactComponent as IconChevronHidden } from '../../assets/nav_menu_chevron.svg';
import { RootState } from '../../store/store';

const categories: Array<{ label: string; count: number | null; to: string }> = [
  {
    label: 'Все книги',
    count: null,
    to: 'all',
  },
  {
    label: 'Бизнес-книги',
    count: 14,
    to: 'bussiness',
  },
  {
    label: 'Детективы',
    count: 8,
    to: 'detectives',
  },
  {
    label: 'Детские книги',
    count: 14,
    to: 'children',
  },
  {
    label: 'Зарубежная литература',
    count: 2,
    to: 'foreign',
  },
  {
    label: 'История',
    count: 5,
    to: 'history',
  },
  {
    label: 'Классическая литература',
    count: 12,
    to: 'classic',
  },
  {
    label: 'Книги по психологии',
    count: 11,
    to: 'psychology',
  },
  {
    label: 'Компьютерная литература',
    count: 54,
    to: 'computer',
  },
  {
    label: 'Культура и искусство',
    count: 5,
    to: 'culture',
  },
  {
    label: 'Наука и образование',
    count: 2,
    to: 'science',
  },
  {
    label: 'Публицистическая литература',
    count: 0,
    to: 'literature',
  },
  {
    label: 'Справочники',
    count: 10,
    to: 'directory',
  },
  {
    label: 'Фантастика',
    count: 12,
    to: 'fantasy',
  },
  {
    label: 'Юмористическая литература',
    count: 8,
    to: 'humor',
  },
];

interface IProps {
  dataTestIdShowcase: string;
  dataTestIdBooks: string;
  dataTestIdTerms: string;
  dataTestIdContract: string;
}

export const NavMenu: FC<IProps> = ({ dataTestIdBooks, dataTestIdContract, dataTestIdShowcase, dataTestIdTerms }) => {
  const { activeGenre, activeDirectory, isHiddenGenres } = useSelector((state: RootState) => state.nav);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLinkClick = (index: number) => {
    dispatch(changeActiveDirectory(0));
    dispatch(changeActiveGenre(index));
    dispatch(close());
  };

  const onDirClick = (index: number) => {
    dispatch(changeActiveDirectory(index));
    console.log('dir click is work')

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

  const closeComponent = () => {
    dispatch(changeActiveDirectory(0))
    dispatch(changeActiveGenre(0))
  }

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => closeComponent(), [])

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
        {activeDirectory === 0 && (
          <button onClick={(e) => onToggleButtonClick(e)} className={styles.menu__btn} type='button'>
            {!isHiddenGenres ? <IconChevronVisible /> : <IconChevronHidden />}
          </button>
        )}
      </div>
      <ul className={!isHiddenGenres ? styles.menu__list : `${styles.menu__list} ${styles.menu__list__hidden}`}>
        {categories.map((category, index) => (
          <li
            data-test-id={index === 0 ? dataTestIdBooks : ''}
            role='presentation'
            className={styles.menu__item}
            key={category.label}
            onClick={() => onLinkClick(index)}
            onKeyDown={() => {}}
          >
            <Link className={styles.menu__link} to={`/books/${category.to}`}>
              {index === activeGenre && activeDirectory === 0 ? (
                <span className={`${styles.label} ${styles.label__active}`}>
                  {category.label}
                  <span className={styles.link__count}>{category.count}</span>
                </span>
              ) : (
                <span className={styles.label}>
                  {category.label}
                  <span className={styles.link__count}>{category.count}</span>
                </span>
              )}
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
