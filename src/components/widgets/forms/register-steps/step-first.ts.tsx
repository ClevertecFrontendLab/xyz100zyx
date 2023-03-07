import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { registerSchemaFirst } from '../../../../utils/validations/register.validation';
import styles from '../register/register-form.module.scss';
import { Input } from '../../../common/input/input';
import { LightText } from '../../../common/light-text/light-text';
import { getRegisterPassErrorText } from './utils/helpers';
import { ERROR_ALL_TEXT, ERROR_LENGTH_NUMBER } from './utils/errors';
import { ColoredPasswordError } from './components/colored-error-password';
import { setFirstStepFields } from '../../../../store/slices/forms/register';
import {ColoredError} from "./components/colored-error";

interface IFormRegister {
  login: string;
  password: string;
}

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export const RegisterFirstStep: FC<IProps> = ({ step, setStep }) => {
  const { register, handleSubmit, formState, watch, getValues, getFieldState } = useForm<IFormRegister>({
    resolver: yupResolver(registerSchemaFirst, { abortEarly: false }),
    mode: 'onChange',
  });

  const [loginFocus, setLoginFocus] = useState<boolean>(true);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    dispatch(setFirstStepFields(data))
    setStep(2);
  };

  useEffect(() => {
    watch();
  }, [watch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__field}>
          <Input
              inputedValue={getValues('login')}
              labelText='Придумайте логин для входа'
              label='login'
              register={register('login')}
              required={false}
              invalid={getFieldState('login').invalid}
              setFocus={setLoginFocus}
          />
          {!loginFocus && getFieldState('login').isDirty && formState.errors.login?.message && (
              /* <p className={styles.form__prompt}>
                <span className={styles.form__prompt_colored}>Используйте для логина латинский алфавит и цифры</span>
              </p> */
              <ColoredError text='Используйте для логина латинский алфавит и цифры' />
          )}
          {getFieldState('login').isDirty && formState.errors.login?.message && loginFocus && (
              <p className={styles.form__prompt}>
                  {LightText( formState.errors.login?.message || '', 'Используйте для логина латинский алфавит и цифры', '', true)}
              </p>
          )}
          {(!getFieldState('login').isDirty || !formState.errors.login?.message) && (
              <p className={styles.form__prompt}>Используйте для логина латинский алфавит и цифры</p>
          )}
      </div>
      <div className={styles.form__field}>
          <Input
              inputedValue={getValues('password')}
              labelText='Пароль'
              label='password'
              register={register('password')}
              required={false}
              isPass={true}
              invalid={getFieldState('password').invalid}
              setFocus={setPasswordFocus}
          />
          {!passwordFocus && getFieldState('password').isDirty && formState.errors.password?.message && (
              /* <p className={styles.form__prompt}>
                <span className={styles.form__prompt_colored}>{ERROR_ALL_TEXT}</span>
              </p> */
              <ColoredError text={ERROR_ALL_TEXT} />
          )}
          {getFieldState('password').isDirty &&
              formState.errors.password?.message &&
              passwordFocus &&
              ColoredPasswordError(getRegisterPassErrorText(getValues('password')), true)}
          {(!getFieldState('password').isDirty || !formState.errors.password?.message) && (
              <p className={styles.form__prompt}>{ERROR_ALL_TEXT}</p>
          )}
      </div>
      {step === 3 ? (
        <input type='submit' className={styles.form__submit} value='ЗАРЕГИСТРИРОВАТЬСЯ' />
      ) : (
        <button
          disabled={!formState.isValid}
          type='submit'
          className={formState.isValid ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}
        >
          Следующий шаг
        </button>
      )}
    </form>
  );
};
