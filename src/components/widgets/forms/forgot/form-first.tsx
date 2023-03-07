import {yupResolver} from '@hookform/resolvers/yup';
import {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {SubmitHandler} from 'react-hook-form/dist/types';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {useThunkDispatch} from '../../../../hooks/redux/dispatchers';
import {rememberPassword} from '../../../../store/slices/auth/async-actions';
import {RootState} from '../../../../store/store';
import {forgotSchemaFirst} from '../../../../utils/validations/forgot.validation';
import {Input} from '../../../common/input/input';
import styles from './forgot-form.module.scss';
import {ForgotFormSecond} from "./form-second";
import {ColoredError} from "../register-steps/components/colored-error";

interface IFormForgotFirst {
    email: string;
}

export const ForgotFormFirst: FC = () => {
    const {register, handleSubmit, getFieldState, watch, getValues} = useForm<IFormForgotFirst>({
        resolver: yupResolver(forgotSchemaFirst),
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const {error} = useSelector((state: RootState) => state.auth);
    const location = useLocation()
    const thunkDispatch = useThunkDispatch();

    const onSubmit: SubmitHandler<IFormForgotFirst> = (data) => {
        thunkDispatch(rememberPassword(data))
    };

    useEffect(() => {
        watch();
    }, [watch]);

    return !location.search ? (
        <>
            <p className={styles.title}>Восстановление пароля</p>
            <form data-test-id='send-email-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('email')}
                        label='email'
                        labelText='E-mail'
                        register={register('email')}
                        required={true}
                        name='email'
                    />
                    {getValues('email') && getFieldState('email').error?.message === 'Введите корректный e-mail' && (
                        /* <p className={styles.form__prompt}>
                          <span className={styles.form__prompt_colored}>{getFieldState('email').error?.message}</span>
                        </p> */
                        <ColoredError text={getFieldState('email').error?.message || ''}/>
                    )}
                    {!getValues('email') && getFieldState('email').isDirty && (
                        /* <p className={styles.form__prompt}>
                          <span className={styles.form__prompt_colored}>Поле не может быть пустым</span>
                        </p> */
                        <ColoredError text='Поле не может быть пустым'/>
                    )}
                    {!getFieldState('email').error?.message &&
                        <p className={styles.form__prompt}>На это email будет отправлено письмо с
                            инструкциями по восстановлению пароля</p>}

                </div>
                <button
                    type='submit'
                    className={styles.form__btn}
                >
                    Восстановить
                </button>
            </form>
        </>
    ) : <ForgotFormSecond/>;
};
