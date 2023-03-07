import {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Input} from '../../../common/input/input';
import styles from './login-form.module.scss';
import {loginSchema} from '../../../../utils/validations/login.validation';
import {useThunkDispatch} from '../../../../hooks/redux/dispatchers';
import {login} from '../../../../store/slices/auth/async-actions';
import {RootState} from '../../../../store/store';
import {LightText} from '../../../common/light-text/light-text';
import {ColoredError} from "../register-steps/components/colored-error";

export interface IFormLogin {
    login: string;
    password: string;
}

export const LoginForm: FC = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        getValues,
        formState
    } = useForm<IFormLogin>({
        resolver: yupResolver(loginSchema),
        mode: 'all',
    });

    const [loginFocus, setLoginFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
    const navigate = useNavigate()

    const {error} = useSelector((state: RootState) => state.auth);
    const thunkDispatch = useThunkDispatch();

    const onSubmit: SubmitHandler<IFormLogin> = (data) => {
        console.log(data)
        thunkDispatch(login(data)).then(() => {
            if (localStorage.getItem('token')) navigate('/books/all')
        });
    };

    useEffect(() => {
        watch();
    }, [watch]);


    /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

    return (
        <>
            <p className={styles.title}>Вход в личный кабинет</p>
            <form data-test-id='auth-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('login')}
                        labelText='Логин'
                        label='login'
                        register={register('login')}
                        required={false}
                        invalid={getFieldState('login').invalid}
                        setFocus={setLoginFocus}
                        name='identifier'
                    />
                    {getFieldState('login').error &&
                        <ColoredError text={getFieldState('login').error?.message || ''}/>}
                    {/* <p className={styles.form__prompt}>{getFieldState('login').error && LightText(getFieldState('login').error?.message!, getFieldState('login').error?.message!, '', true)}</p> */}
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
                        name='password'
                    />
                    {getFieldState('password').error &&
                        <ColoredError text={getFieldState('password').error?.message || ''}/>}
                    {/* <p className={styles.form__prompt}>{getFieldState('password').error && LightText(getFieldState('password').error?.message!, getFieldState('password').error?.message!, '', true)}</p> */}
                </div>
                {error?.error.status === 400 ? (
                    <p className={styles.form__error}>
                        Неверный логин или пароль!
                        <Link className={styles.form__error_link} to='/forgot-pass'>
                            Восстановить?
                        </Link>
                    </p>
                ) : (
                    <p className={styles.form__error}>
                        <Link className={styles.form__link_forgot} to='/forgot-pass'>
                            Забыли логин или пароль?
                        </Link>
                    </p>
                )}
                <input type='submit' className={styles.form__submit} value='Вход'/>
            </form>
        </>
    );
};
