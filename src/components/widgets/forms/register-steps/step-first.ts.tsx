import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {registerSchemaFirst} from '../../../../utils/validations/register.validation';
import styles from '../register/register-form.module.scss';
import {Input} from '../../../common/input/input';
import {getRegisterPassErrorText} from './utils/helpers';
import {ERROR_ALL_TEXT} from './utils/errors';
import {ColoredPasswordError} from './components/colored-error-password';
import {setFirstStepFields} from '../../../../store/slices/forms/register';
import {ColoredError} from "./components/colored-error";

interface IFormRegister {
    username: string;
    password: string;
}

interface IProps {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
}

export const RegisterFirstStep: FC<IProps> = ({step, setStep}) => {
    const {
        register,
        handleSubmit,
        formState,
        watch,
        getValues,
        getFieldState
    } = useForm<IFormRegister>({
        resolver: yupResolver(registerSchemaFirst, {abortEarly: false}),
        mode: 'onChange',
        criteriaMode: 'all'
    });

    const [loginFocus, setLoginFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [isTouchedLogin, setTouchedLogin] = useState<boolean>(false)
    const [isTouchedPassword, setTouchedPassword] = useState<boolean>(false)
    const dispatch = useDispatch()

    const onLoginFocusToggle = () => {
        setLoginFocus(prev => !prev)
        if (!isTouchedLogin) {
            setTouchedLogin(true)
        }
    }

    const onPasswordFocusToggle = () => {
        setPasswordFocus(prev => !prev)
        if (!isTouchedPassword) {
            setTouchedPassword(true)
        }

    }

    const onSubmit: SubmitHandler<IFormRegister> = (data) => {
        dispatch(setFirstStepFields(data))
        setStep(2);
    };

    useEffect(() => {
        watch();
    }, [watch]);


    return (
        <form data-test-id='register-form' className={styles.form}
              onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form__field}>
                <Input
                    inputedValue={getValues('username')}
                    labelText='Придумайте логин для входа'
                    label='login'
                    register={register('username')}
                    required={false}
                    invalid={getFieldState('username').invalid}
                    setFocus={onLoginFocusToggle}
                    name='username'
                />
                {(isTouchedLogin && !loginFocus && !getValues('username').length) &&
                    <ColoredError dataTestId='hint'
                                  text='Поле не может быть пустым'/>}
                {(!loginFocus && formState.errors.username?.message && getValues('username')) && (
                    <ColoredError dataTestId='hint'
                                  text='Используйте для логина латинский алфавит и цифры'/>
                )}
                {(getFieldState('username').isDirty && Array.isArray(getFieldState('username').error?.types?.matches) && loginFocus) && (
                    <p data-test-id='hint' className={styles.form__prompt}>
                        Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и <span
                        className={styles.form__prompt_colored}>цифры</span>
                    </p>
                )}
                {(getFieldState('username').isDirty && loginFocus && getFieldState('username').error?.types?.matches === 'латинский алфавит' && !getValues('username').match(new RegExp(/^[^а-яё]+$/iu))) && (
                    <p data-test-id='hint' className={styles.form__prompt}>
                        Используйте для логина латинский алфавит и <span
                        style={{color: 'rgb(167, 167, 167)'}}
                        className={styles.form__prompt_colored}>цифры</span>
                    </p>
                )}
                {(getFieldState('username').isDirty && loginFocus && getFieldState('username').error?.types?.matches === 'латинский алфавит' && getValues('username').match(new RegExp(/^[^а-яё]+$/iu))) && (
                    <p data-test-id='hint' className={styles.form__prompt}>
                        Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и
                        цифры
                    </p>
                )}
                {(getFieldState('username').isDirty && loginFocus && getFieldState('username').error?.types?.matches === 'цифры') && (
                    <p data-test-id='hint' className={styles.form__prompt}>
                        Используйте для логина латинский алфавит и <span
                        className={styles.form__prompt_colored}>цифры</span>
                    </p>
                )}
                {((!getFieldState('username').error) || (!isTouchedLogin && !loginFocus && !getValues('username'))) && (
                    <p data-test-id='hint' className={styles.form__prompt}>Используйте для логина
                        латинский алфавит и цифры</p>
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
                    setFocus={onPasswordFocusToggle}
                    name='password'
                    isNeedCheck={true}
                />
                {(isTouchedPassword && !passwordFocus && !getValues('password').length) &&
                    <ColoredError dataTestId='hint'
                                  text='Поле не может быть пустым'/>}
                {(!passwordFocus && getFieldState('password').isDirty && formState.errors.password?.message && getValues('password')) && (
                    <ColoredError dataTestId='hint' text={ERROR_ALL_TEXT}/>
                )}
                {(getFieldState('password').isDirty &&
                        formState.errors.password?.message &&
                        passwordFocus) &&
                    ColoredPasswordError(getRegisterPassErrorText(getValues('password')), true)}
                {((!isTouchedPassword || !formState.errors.password?.message && getValues('password')) || (!getFieldState('password').error && passwordFocus)) && (
                    <p data-test-id='hint' className={styles.form__prompt}>{ERROR_ALL_TEXT}</p>
                )}
            </div>
            {step === 3 ? (
                <input type='submit' className={styles.form__submit} value='ЗАРЕГИСТРИРОВАТЬСЯ'/>
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
