import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useThunkDispatch } from '../../../../hooks/redux/dispatchers';
import { rememberPassword } from '../../../../store/slices/auth/async-actions';
import { RootState } from '../../../../store/store';
import { forgotSchemaFirst } from '../../../../utils/validations/forgot.validation';
import { Input } from '../../../common/input/input';
import styles from './forgot-form.module.scss';

interface IFormForgotFirst {
  email: string;
}

export const ForgotFormFirst: FC = () => {
  const { register, handleSubmit, getFieldState, watch, getValues } = useForm<IFormForgotFirst>({
    resolver: yupResolver(forgotSchemaFirst),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);
  const thunkDispatch = useThunkDispatch();

  const onSubmit: SubmitHandler<IFormForgotFirst> = (data) => {
    thunkDispatch(rememberPassword(data))
  };

  console.log(getFieldState('email'), ' ', getValues('email'));

  useEffect(() => {
    watch();
  }, [watch]);

  return (
    <>
      <p className={styles.title}>Восстановление пароля</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputedValue={getValues('email')}
          label='email'
          labelText='E-mail'
          register={register('email')}
          required={true}
        />
        {getValues('email') && getFieldState('email').error?.message === 'Введите корректный e-mail' && (
          <p className={styles.form__prompt}>
            <span className={styles.form__prompt_colored}>{getFieldState('email').error?.message}</span>
          </p>
        )}
        {!getValues('email') && getFieldState('email').isDirty && (
          <p className={styles.form__prompt}>
            <span className={styles.form__prompt_colored}>Поле не может быть пустым</span>
          </p>
        )}
        {!getFieldState('email').error?.message && <p className={styles.form__prompt} />}

        <button
          type='submit'
          className={styles.form__btn}
        >
          Восстановить
        </button>
      </form>
    </>
  );
};
