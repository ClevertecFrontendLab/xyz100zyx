import {FC, MouseEvent} from 'react';
import {useDispatch} from 'react-redux';
import { close } from '../../../store/slices/popup/popup-slice';
import styles from './modal-window.module.scss';

interface IProps{
    children:JSX.Element,
    isVisible: boolean,
}
export const ModalWindow: FC<IProps> = ({children, isVisible}) => {

    const dispatch = useDispatch()

    const onWindowClick = (e: MouseEvent) => {
        if(e.target === e.currentTarget){
            dispatch(close())
        }
    }

    return (
        <div role="presentation" onClick={(e) => onWindowClick(e)} className={isVisible ? styles.window : `${styles.window} ${styles.window__none}`}>{children}</div>
    )
}
