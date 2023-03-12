import { FC } from 'react';
import styles from './auth.module.scss';

export const ForgotSuccessPopup: FC = () => (
  <div data-test-id='status-block' className={`${styles.popup} ${styles.popup__forgot}`}>
    <p className={`${styles.popup__title} ${styles.popup__title_forgot}`}>Письмо выслано</p>
    <p className={`${styles.popup__subtitle} ${styles.popup__subtitle_forgot}`}>
      Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
    </p>
  </div>
);
