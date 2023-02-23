import { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../../store/slices/popup/burger-slice';
import { RootState } from '../../../store/store';
import { BurgerNav } from '../burger';
import { ErrorPopup } from '../error/error';
import styles from './modal-window.module.scss';

export const ModalWindow: FC = () => {
  const dispatch = useDispatch();
  const isBurgerNavOpen = useSelector((state: RootState) => state.popup.burgerNav);
  const statusCategory = useSelector((state: RootState) => state.nav.status);
  const bookCategory = useSelector((state: RootState) => state.books.status);
  const isError = statusCategory === 'rejected' || bookCategory === 'rejected';
  const isVisible = isBurgerNavOpen || statusCategory === 'rejected' || bookCategory === 'rejected';

  const onWindowClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(close());
    }
  };

  return (
    <div
      role='presentation'
      onClick={(e) => onWindowClick(e)}
      className={
        isError
          ? `${styles.window} ${styles.window__error}`
          : isVisible
          ? styles.window
          : `${styles.window} ${styles.window__none}`
      }
    >
      <BurgerNav />
      {isError && <ErrorPopup text='Что-то пошло не так. Обновите страницу через некоторое время.' />}
    </div>
  );
};
