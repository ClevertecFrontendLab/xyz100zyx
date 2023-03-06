import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { registerSchemaThird } from '../../../../utils/validations/register.validation';
import { Input } from '../../../common/input/input';
import styles from '../register/register-form.module.scss';
import { useThunkDispatch } from '../../../../hooks/redux/dispatchers';
import { RootState } from '../../../../store/store';
import { setThirdStepFields } from '../../../../store/slices/forms/register';
import { registration } from '../../../../store/slices/auth/async-actions';

interface IFormRegister {
  phone: string;
  email: string;
}

export const RegisterThirdStep: FC = () => {
  const { register, handleSubmit, formState, watch, getValues, getFieldState, control } = useForm<IFormRegister>({
    mode: 'all',
    resolver: yupResolver(registerSchemaThird),
  });

  const [phoneFocus, setPhoneFocus] = useState(true);
  const { regData } = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();

  const onSubmit: SubmitHandler<IFormRegister> = (data) => {
    dispatch(setThirdStepFields(data));
    console.log(data)
    thunkDispatch(registration({...regData, ...data}))
  };

  useEffect(() => {
    watch();
  }, [watch]);

  console.log(getFieldState('phone'));

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='phone'
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState: { isTouched, error } }) => (
          <Input
            inputedValue={value}
            label='phone'
            labelText='Номер телефона'
            register={register('phone')}
            required={true}
            setFocus={setPhoneFocus}
            isFocus={phoneFocus}
            ref={ref}
            maskedOptions={{
              keepCharPositions: true,
              placeholderChar: 'x',
              mask: [
                '+',
                '3',
                '7',
                '5',
                ' ',
                '(',
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
              ],
              onChange,
              onBlur,
            }}
          />
        )}
      />
      {getValues('phone') && getFieldState('phone').error?.message === 'В формате +375 (xx) xxx-xx-xx' && (
        <p className={styles.form__prompt}>
          <span className={styles.form__prompt_colored}>{getFieldState('phone').error?.message}</span>
        </p>
      )}
      {!getValues('phone') && getFieldState('phone').isDirty && (
        <p className={styles.form__prompt}>
          <span className={styles.form__prompt_colored}>Поле не может быть пустым</span>
        </p>
      )}
      {(!getFieldState('phone').isDirty || !getFieldState('phone').error) && <p className={styles.form__prompt} />}
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
        disabled={!formState.isValid}
        type='submit'
        className={formState.isValid ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
