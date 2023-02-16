import { Dispatch, FC, SetStateAction } from 'react';
import { DisplayType } from '../../types';
import styles from './display-button.module.scss';
import { ReactComponent as IconViewSquare } from '../../../assets/view-icon-square.svg';
import { ReactComponent as IconViewList } from '../../../assets/view-icon-list.svg';

interface IProps {
  type: DisplayType;
  onClick: Dispatch<SetStateAction<DisplayType>>;
  displayState: DisplayType;
  dataTestId: string;
}

export const DisplayButton: FC<IProps> = ({ type, onClick, displayState, dataTestId }) => (
  <button
    data-test-id={dataTestId}
    onClick={() => onClick(type)}
    type='button'
    className={displayState === type ? `${styles.button} ${styles.button__active}` : `${styles.button}`}
  >
    {type === 'linear' ? <IconViewSquare /> : <IconViewList />}
  </button>
);
