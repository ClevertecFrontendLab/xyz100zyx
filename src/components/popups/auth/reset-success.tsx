import {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';

export const ResetSuccessPopup: FC = () => {
    const navigate = useNavigate()

    const onButtonLoginClick = () => {
        navigate('/auth')
    }

    return (
        <div data-test-id='status-block' className={`${styles.popup} ${styles.popup__forgot}`}>
            <p className={styles.popup__title}>Новые данные сохранены</p>
            <p className={styles.popup__subtitle}>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
            <button onClick={onButtonLoginClick} type='button' className={styles.popup__btn}>Вход</button>
        </div>
    )
}
