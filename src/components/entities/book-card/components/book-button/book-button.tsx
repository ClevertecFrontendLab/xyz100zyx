import { FC } from 'react';
import classNames from 'classnames';
import { DisplayType } from '../../../../types';
import styles from './book-button.module.scss';

interface IProps {
  text: string;
  onClick?: () => void;
  type: BookButtonType;
  displayType?: DisplayType;
}

type BookButtonType = 'available' | 'added' | 'unavailable';
export const BookButton: FC<IProps> = ({ text, onClick, type, displayType }) => (
  <button
    className={classNames(
      styles.button,
      type === 'available'
        ? styles.button__available
        : type === 'added'
        ? styles.button__added
        : styles.button__unavailable,
      displayType === 'linear' ? styles.button__linear : styles.button__vertical
    )}
    type='button'
  >
    {text}
  </button>
);
