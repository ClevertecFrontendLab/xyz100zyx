import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './page.module.scss';
import { RootState } from '../../../../store/store';
import { AuthErrorPopup } from '../../../../components/popups/auth/auth-error';
import { setAllNull } from '../../../../store/slices/auth/auth-slice';
import { RegisterSuccessPopup } from '../../../../components/popups/auth/register-success';
import { ForgotSuccessPopup } from '../../../../components/popups/auth/forgot-success';

export const AuthPage: FC = () => {
  const { error, status } = useSelector((state: RootState) => state.auth);
  const path = useLocation().pathname.slice(1);
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    dispatch(setAllNull());
  }, [path]);

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <h3 className={styles.page__title}>Cleverland</h3>
        {error && (path === 'register' || (path === 'auth' && error?.error.status !== 400)) ? (
          <AuthErrorPopup />
        ) : path === 'register' && status === 'fulfilled' ? (
          <RegisterSuccessPopup />
        ) : path === 'forgot-pass' && status === 'fulfilled' ? <ForgotSuccessPopup /> : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
