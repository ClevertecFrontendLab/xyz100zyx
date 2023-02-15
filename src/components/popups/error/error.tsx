import {FC} from 'react';
import { useDispatch } from 'react-redux';
import styles from './error.module.scss';
import iconError from '../../../assets/error-circle.svg';
import iconClose from '../../../assets/error-close.svg';
import { nullableStatus } from '../../../store/slices/books/book-slice';
import { nullableCategoryStatus } from '../../../store/slices/nav/nav-slice';


interface IProps{
    text: string;
}

export const ErrorPopup: FC<IProps> = ({text}) => {

    const dispatch = useDispatch()

    const onCloseClick = () => {
        dispatch(nullableCategoryStatus())
        dispatch(nullableStatus())
    }

    return (
        <div className={styles.popup}>
            <div data-test-id='error' className={styles.popup__content}>
                <img className={styles.popup__error} src={iconError} alt="error" />
                <span className={styles.popup__text}>{text}</span>
                <img role="presentation" onClick={onCloseClick} className={styles.popup__close} src={iconClose} alt="close" />
            </div>
        </div>
    )
}