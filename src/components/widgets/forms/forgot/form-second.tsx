import {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler} from "react-hook-form/dist/types";
import styles from "./forgot-form.module.scss";
import {Input} from "../../../common/input/input";
import {
    forgotSchemaSecond
} from "../../../../utils/validations/forgot.validation";
import {RootState} from "../../../../store/store";
import {useThunkDispatch} from "../../../../hooks/redux/dispatchers";
import {ERROR_ALL_TEXT} from "../register-steps/utils/errors";
import {ColoredPasswordError} from "../register-steps/components/colored-error-password";
import {getRegisterPassErrorText} from "../register-steps/utils/helpers";
import {ColoredError} from "../register-steps/components/colored-error";
import {resetPassword} from "../../../../store/slices/auth/async-actions";

interface IFormForgotSecond {
    password: string,
    passwordConfirmation: string,
    code: string,
}

export const ForgotFormSecond: FC = () => {
    const {register, handleSubmit, getFieldState, watch, getValues, formState} = useForm<IFormForgotSecond>({
        resolver: yupResolver(forgotSchemaSecond),
        mode: 'onChange',
    });

    const [passwordFocus, setPasswordFocus] = useState(false)
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()
    const {error} = useSelector((state: RootState) => state.auth);
    const thunkDispatch = useThunkDispatch();
    const checkAvailableButton = (deps: boolean[]) => deps.every(dep => dep===true)

    const onSubmit: SubmitHandler<IFormForgotSecond> = (data) => {
        thunkDispatch(resetPassword({password: data.password, passwordConfirmation: data.passwordConfirmation, code: location.search.slice(6)}))
    };

    useEffect(() => {
        watch();
    }, [watch]);

    console.log(getFieldState('passwordConfirmation'), getValues())

    return (
        <>
            <p className={styles.title}>Восстановление пароля</p>
            <form data-test-id='reset-password-form' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('password')}
                        labelText='Новый пароль'
                        label='password'
                        register={register('password')}
                        required={false}
                        isPass={true}
                        invalid={getFieldState('password').invalid}
                        setFocus={setPasswordFocus}
                        isNeedCheck={true}
                        name='password'
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
                    {(!getFieldState('password').isDirty || getFieldState('password').isDirty) && !formState.errors.password?.message && (
                        <p className={styles.form__prompt}>{ERROR_ALL_TEXT}</p>
                    )}
                    {(!getFieldState('password').isDirty && formState.errors.password?.message) && (
                        <ColoredError text='Поле не может быть пустым' />
                    )}
                </div>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('passwordConfirmation')}
                        labelText='Повторите пароль'
                        label='passwordConfirmation'
                        register={register('passwordConfirmation')}
                        required={false}
                        isPass={true}
                        invalid={getFieldState('passwordConfirmation').invalid}
                        setFocus={setPasswordConfirmFocus}
                        isNeedCheck={false}
                        name='passwordConfirmation'
                    />
                    {getFieldState('passwordConfirmation').isDirty && !!getValues('passwordConfirmation') && !passwordConfirmFocus && getValues('passwordConfirmation') !== getValues('password') && (
                        /* <p className={styles.form__prompt}>
                            <span className={styles.form__prompt_colored}>Пароли не совпадают</span>
                        </p> */
                        <ColoredError text='Пароли не совпадают' />
                    )}
                    {getFieldState('passwordConfirmation').error && !passwordConfirmFocus && (
                        /* <p className={styles.form__prompt}>
                            <span className={styles.form__prompt_colored}>{getFieldState('passwordConfirmation').error!.message}</span>
                        </p> */
                        <ColoredError text={getFieldState('passwordConfirmation').error!.message || ''} />
                    )}
                </div>
                <button
                    type='submit'
                    className={checkAvailableButton([getValues('password') === getValues('passwordConfirmation'), !getFieldState('passwordConfirmation').error, !getFieldState('password').error]) ? styles.form__btn : `${styles.form__btn} ${styles.form__btn_error}`}
                    disabled={!checkAvailableButton([getValues('password') === getValues('passwordConfirmation'), !getFieldState('passwordConfirmation').error, !getFieldState('password').error])}
                >
                    Сохранить изменения
                </button>
                <p className={styles.form__text}>После сохранения войдите в библиотеку, используя новый пароль</p>
            </form>
        </>
    )
}
